import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Modal,
  Fade,
  Backdrop,
  CardHeader,
  Button
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const EscolaTable = props => {
  const { className, escolas, handleDelete, handleEdit, ...rest } = props;

  const [open, setOpen] = useState(false)
  const [escola, setEscola] = useState({})

  const classes = useStyles();

  const handleOpenDelete = (_escola) => {
    setEscola(_escola)
    setOpen(true)
  }

  const handleDeleteYes = () => {
    setOpen(false)
    handleDelete(escola)
  }

  const handleCloseDelete = () => {
    setOpen(false)
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Quantidade de alunos</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {escolas.map(escola => (
                  <TableRow className={classes.tableRow} hover key={escola.id}>
                    <TableCell>{escola.id}</TableCell>
                    <TableCell>
                      <Typography variant="body1">{escola.nome}</Typography>
                    </TableCell>
                    <TableCell>{escola.qtdAlunos}</TableCell>
                    <TableCell>
                      <IconButton aria-label="edit" className={classes.margin} onClick={() => handleEdit(escola)}>
                        <Edit />
                      </IconButton>
                      <IconButton aria-label="delete" className={classes.margin} onClick={() => handleOpenDelete(escola)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleCloseDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card {...rest}
            className={clsx(classes.root, className)}>
            <CardHeader
              title="Confirmação" />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Confirma a exclusão da escola?
            </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={handleDeleteYes}>Sim</Button>
              <Button onClick={handleCloseDelete}>Não</Button>
            </CardActions>
          </Card>

        </Fade>
      </Modal>
    </Card>
  );
};

EscolaTable.propTypes = {
  className: PropTypes.string,
  escolas: PropTypes.array.isRequired,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func
};

export default EscolaTable;
