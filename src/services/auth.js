import bcrypt from 'bcrypt';
import crypto from 'crypto';
import createHttpError from 'http-errors';

import { User } from '../db/models/User.js';
import { Session } from '../db/models/Session.js';

const createSession = () => {
  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  };
};

export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    password: encryptedPassword,
  });

  return user;
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(401, 'Unauthorized');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  // Delete existing session if exists
  await Session.deleteOne({ userId: user._id });

  const sessionData = createSession();

  const session = await Session.create({
    userId: user._id,
    ...sessionData,
  });

  return session;
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  // Delete old session
  await Session.deleteOne({ _id: sessionId });

  const newSessionData = createSession();

  const newSession = await Session.create({
    userId: session.userId,
    ...newSessionData,
  });

  return newSession;
};

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

export const findUser = async (filter) => {
  const user = await User.findOne(filter);
  return user;
};

export const findSession = async (filter) => {
  const session = await Session.findOne(filter);
  return session;
};