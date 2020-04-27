import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { EscolaForm, EscolaToolbar, EscolaTable } from './components';
import { getEscolas, saveEscola, updateEscola, deleteEscola } from 'helpers/api';
import { setEnqueueSnackbar, showMessageError, showMessageSuccess } from 'helpers/snackbar'
import { withSnackbar, useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const Escolas = (props) => {
    const classes = useStyles()
    const { enqueueSnackbar } = props
    const [open, setOpen] = useState(false)
    const [escola, setEscola] = useState({})
    const [escolas, setEscolas] = useState([])


    const handleOpen = () => () => {
        setEscola({})
        setOpen(true)
    }

    const handleEdit = (_escola) => {
        setEscola(_escola)
        setOpen(true)
    }

    const handleDelete = (_escola) => {
        deleteEscola(_escola.id, (result) => {
            handleGetEscolas()
            showMessageSuccess(result.message)
        }, (error) => {
            showMessageError(error)
        })
    }

    const handleSave = (_escola) => {
        if (_escola.id) {
            updateEscola(_escola, (result) => {
                handleGetEscolas()
                showMessageSuccess(result.message)
            }, (error) => {
                showMessageError(error)
            })
        } else {
            saveEscola(_escola, (result) => {
                handleGetEscolas()
                showMessageSuccess(result.message)
            }, (error) => {
                showMessageError(error)
            })
        }
    }

    const handleClose = (update) => {
        setOpen(false)
        if (update === 'atualizar') {
            handleGetEscolas()
        }
    }

    const handleGetEscolas = () => {
        getEscolas((ws) => {
            setEscolas(ws || [])
        }, (error) => {
            showMessageError(error)
        })
    }

    useEffect(() => {
        setEnqueueSnackbar(enqueueSnackbar)
        handleGetEscolas()
    }, [])

    return (
        <div className={classes.root}>
            <EscolaForm open={open} ws={escola} handleClose={handleClose} handleSave={handleSave} />
            <EscolaToolbar handleOpen={handleOpen} />
            <div className={classes.content}>
                <EscolaTable escolas={escolas} handleEdit={handleEdit} handleDelete={handleDelete} />
            </div>
        </div>
    )
}

export default withSnackbar(Escolas);