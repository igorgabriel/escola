package models

// Escola ...
type Escola struct {
	ID  int    `json:"id"`
	Nm  string `json:"nome"`
	Qtd int    `json:"qtdAlunos"`
}
