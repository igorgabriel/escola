package routes

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/igorgabriel/api-escola/src/controllers"
	"github.com/igorgabriel/api-escola/src/models"
)

// InitializeRoutes ...
func InitializeRoutes(router *gin.Engine) {
	v1 := router.Group("/v1")
	{
		v1.GET("/ping", handlePing)
		v1.POST("/escolas", handlePostEscola)
		v1.PUT("/escolas/:id", handlePutEscola)
		v1.GET("/escolas/:id", handleGetEscola)
		v1.GET("/escolas", handleGetEscolas)
		v1.DELETE("/escolas/:id", handleDeleteEscola)
	}
}

func handlePing(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "pong"})
}

func handleGetEscolas(c *gin.Context) {
	var es []models.Escola

	es, err := controllers.GetEscolas()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"escolas": es})
}

func handlePostEscola(c *gin.Context) {
	var e models.Escola
	if err := c.ShouldBindJSON(&e); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if err := controllers.SaveEscola(e); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Escola criada com sucesso"})
}

func handlePutEscola(c *gin.Context) {
	idS := c.Param("id")
	id, err := strconv.Atoi(idS)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	var e models.Escola
	if err := c.ShouldBindJSON(&e); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	e.ID = id
	if err := controllers.UpdateEscola(e); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Escola atualizada com sucesso"})
}

func handleDeleteEscola(c *gin.Context) {
	idS := c.Param("id")
	id, err := strconv.Atoi(idS)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	if err = controllers.DeleteEscola(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Escola removida com sucesso"})
}

func handleGetEscola(c *gin.Context) {
	idS := c.Param("id")
	id, err := strconv.Atoi(idS)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	e, err := controllers.GetEscolaByID(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"escola": e})
}
