import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const login = async ({ username, password }) => {
    const db = await open({
        filename: './db/database.db',
        driver: sqlite3.Database,
    });

    const user = await db.get('SELECT * FROM users WHERE username=? AND password = ?', [username, password]);
    return user;
};

export const updateUserStripdId = async (stripeCustomerId, userId) => {
    const db = await open({
        filename: './db/database.db',
        driver: sqlite3.Database,
    });

    const user = await db.run('UPDATE users SET stripeId=? WHERE id=? ', [stripeCustomerId, userId]);

    console.log(userId, user, 'update user');
    return user;
};

export const getUser = async (id) => {
    const db = await open({
        filename: './db/database.db',
        driver: sqlite3.Database,
    });

    const user = await db.get('SELECT * FROM users WHERE id=?', [id]);
    return user ? user : undefined;
};

export const getStripeId = async (id) => {
    const db = await open({
        filename: './db/database.db',
        driver: sqlite3.Database,
    });

    const user = await db.get('SELECT stripeId FROM users WHERE id=?', [id]);
    return user ? user.stripeId : undefined;
};

export const saveSubscription = async ({ userId, planId, subscriptionId }) => {
    const db = await open({
        filename: './db/database.db',
        driver: sqlite3.Database,
    });
    return await db.run('INSERT INTO subscriptions (userId, planId, subscriptionId) VALUES (?, ?,?)', [userId, planId, subscriptionId]);
};

export const getUserSubscription = async (userId) => {
    const db = await open({
        filename: './db/database.db',
        driver: sqlite3.Database,
    });

    console.log(userId, 'useriD');
    return await db.get('SELECT * FROM subscriptions WHERE userId=? LIMIT 1', [userId]);
};
