import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Tp4.db');

class DatabaseManager {
  static createTable() {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS music (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT NOT NULL, artiste TEXT NOT NULL, lienImage TEXT NOT NULL, parole TEXT NOT NULL);',
          [],
          () => {
            console.log('Table créée avec succès');
          },
          (_, error) => {
            console.error('Erreur lors de la création de la table', error);
          }
        );
      },
      (error) => {
        console.error('Transaction error', error);
      }
    );
  }

  static insertItem(nom, artiste, lienImage, parole, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO music (nom, artiste, lienImage, parole) VALUES (?, ?, ?, ?);',
        [nom, artiste, lienImage, parole],
        (_, result) => {
          callback(result.insertId);
        },
        (_, error) => {
          console.error('Erreur lors de l\'ajout de l\'élément', error);
        }
      );
    });
  }  

  static updateItem(id, field, value, callback) {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `UPDATE music SET ${field} = ? WHERE id = ?;`,
          [value, id],
          (_, result) => {
            callback(result.rowsAffected);
          },
          (_, error) => {
            console.error('Erreur lors de la mise à jour de l\'élément', error);
          }
        );
      },
      (error) => {
        console.error('Transaction error', error);
      }
    );
  }

  static deleteItem(id, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM music WHERE id = ?;',
        [id],
        (_, result) => {
          callback(result.rowsAffected);
        },
        (_, error) => {
          console.error('Erreur lors de la suppression de l\'élément', error);
        }
      );
    });
  }

  static fetchAllItems(callback) {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM music;',
        [],
        (_, result) => {
          callback(result.rows._array);
        },
        (_, error) => {
          console.error('Erreur lors de la récupération des éléments', error);
        }
      );
    });
  }

  static fetchItemById(id, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM music WHERE id = ?;',
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            callback(result.rows.item(0));
          } else {
            callback(null);
          }
        },
        (_, error) => {
          console.error('Erreur lors de la récupération de l\'élément par ID', error);
        }
      );
    });
  }  
}

export default DatabaseManager;