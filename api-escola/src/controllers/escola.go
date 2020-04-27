package controllers

import (
	"fmt"

	"github.com/igorgabriel/api-escola/src/helpers"
	"github.com/igorgabriel/api-escola/src/models"
	"github.com/sirupsen/logrus"
)

// GetEscolas will return all escolas.
func GetEscolas() ([]models.Escola, error) {
	db, err := helpers.DBConn()
	defer db.Close()
	if err != nil {
		logrus.Errorln("erro: ", err)
		return nil, err
	}

	rs, err := db.Query(`SELECT * FROM escola`)
	defer rs.Close()
	if err != nil {
		logrus.Errorln("erro: ", err)
		return nil, err
	}

	var e models.Escola
	var es []models.Escola
	for rs.Next() {
		err = rs.Scan(&e.ID, &e.Nm, &e.Qtd)
		if err != nil {
			logrus.Errorln("erro: ", err)
			panic(err.Error())
		}
		es = append(es, e)
	}

	return es, nil

}

// GetEscolaByID will retrieve escola ID and returns the escola.
func GetEscolaByID(id int) (*models.Escola, error) {
	db, err := helpers.DBConn()
	defer db.Close()
	if err != nil {
		logrus.Errorln("erro: ", err)
		return nil, err
	}

	rs, err := db.Query("SELECT * FROM escola WHERE id = ?", id)
	if err != nil {
		logrus.Errorln("erro: ", err)
		return nil, err
	}

	e := models.Escola{}
	for rs.Next() {
		err = rs.Scan(&e.ID, &e.Nm, &e.Qtd)
		if err != nil {
			logrus.Errorln("erro: ", err)
			panic(err.Error())
		}
	}

	return &e, nil
}

// SaveEscola will retrieve a escola and save them
func SaveEscola(l models.Escola) error {
	db, err := helpers.DBConn()
	defer db.Close()
	sql := fmt.Sprintf(`INSERT INTO escola(nome, qtd_alunos) 
						VALUES(?,?)`)
	stmt, err := db.Prepare(sql)
	defer stmt.Close()
	if err != nil {
		logrus.Errorln("erro: ", err)
		return err
	}

	_, err = stmt.Exec(l.Nm, l.Qtd)
	if err != nil {
		logrus.Errorln("erro: ", err)
		return err
	}

	return nil
}

// DeleteEscola will retrieve a escola id and delete them
func DeleteEscola(id int) error {
	db, err := helpers.DBConn()
	defer db.Close()

	i := fmt.Sprintf(`DELETE FROM escola WHERE id=?`)

	stmt, err := db.Prepare(i)
	defer stmt.Close()

	if err != nil {
		logrus.Errorln("erro: ", err)
		return err
	}

	_, err = stmt.Exec(id)

	if err != nil {
		logrus.Errorln("erro: ", err)
		return err
	}

	return nil
}

// UpdateEscola will retrieve escola and update them
func UpdateEscola(e models.Escola) error {
	db, err := helpers.DBConn()
	defer db.Close()
	if err != nil {
		logrus.Errorln("erro: ", err)
		return err
	}

	sql := fmt.Sprintf(`UPDATE escola SET nome = ?, qtd_alunos = ? WHERE id = ?`)

	stmt, err := db.Prepare(sql)
	defer stmt.Close()
	if err != nil {
		logrus.Errorln("erro: ", err)
		return err
	}

	_, err = stmt.Exec(e.Nm, e.Qtd, e.ID)
	if err != nil {
		logrus.Errorln("erro: ", err)
		return err
	}

	return nil
}
