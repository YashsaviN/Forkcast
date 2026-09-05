export async function initializeDatabase(db) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      budget TEXT,
      cuisines TEXT,
      dietary TEXT,
      spice TEXT, 
      usual_order TEXT,
      favourite_foods TEXT,
      comfort_food TEXT,
      disliked_foods TEXT,
      moods TEXT
    );
  `);
}
export async function updateUserBudget(db, userId, budget) {
    await db.runAsync(
        `UPDATE users
         SET budget = ?
         WHERE id = ?`,
        [budget, userId]
    );
}

export async function updateUserCuisine(db, userId, cuisines) {
    await db.runAsync(
        `UPDATE users
         SET cuisines = ?
         WHERE id = ?`,
        [cuisines, userId]
    );
}

export async function updateUserDietary(db, userId, dietary) {
    await db.runAsync(
        `UPDATE users
         SET dietary = ?
         WHERE id = ?`,
        [dietary, userId]
    );
}

export async function updateUserSpice(db, userId, spice) {
    await db.runAsync(
        `UPDATE users
         SET spice = ?
         WHERE id = ?`,
        [spice, userId]
    );
}

export async function updateUserPreferences(
    db,
    userId,
    usualOrder,
    favouriteFoods,
    comfortFood,
    dislikedFoods,
    moods
) {
    await db.runAsync(
        `UPDATE users
         SET usual_order = ?,
             favourite_foods = ?,
             comfort_food = ?,
             disliked_foods = ?,
             moods = ?
         WHERE id = ?`,
        [
            usualOrder,
            favouriteFoods,
            comfortFood,
            dislikedFoods,
            JSON.stringify(moods),
            userId,
        ]
    );
}