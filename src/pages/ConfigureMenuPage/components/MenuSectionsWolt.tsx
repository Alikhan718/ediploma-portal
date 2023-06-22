import React from "react";

import { Box, Typography, Dialog } from "@mui/material";
import { useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import Swal from "sweetalert2";

import { Button, Input, Textarea } from "@src/components";
import { addNewCollection, updateCollection, addNewCategory, deleteCategory } from "@src/store/menu/actionCreators";
import { ReactComponent as DeleteIcon } from "@src/assets/icons/delete_outline.svg";
import AddIcon from '@src/assets/icons/plus.png';
import styles from "./MenuSections/Alert.module.css";
import { DescriptionTypes } from "../generator";

interface MenuSectionsProps {
  menu_collections: Array<any> | undefined,
  menu_id: string,
  open: boolean,
  btnSubmitStatus: boolean,
  handleClose: () => void
};

export const MenuSectionWolt: React.FC<MenuSectionsProps> = React.memo(function MenuSection(props: MenuSectionsProps) {
  const { menu_collections, menu_id, open, handleClose, btnSubmitStatus } = props;
  const dispatch = useDispatch();

  const [fields, setFields] = React.useState<any[] | undefined>([]);
  // using for fixing position of button, when drag is activate
  const [isDragged, setIsDragged] = React.useState(false);

  const onSubmit = (event: any): void => {
    event.preventDefault();
    dispatch(updateCollection({ menu_id, data: { "collections": fields, "sections": fields }, is_wolt: true }));
  };

  const onDragStart = (): void => setIsDragged(true);

  const onDragEnd = (result: DropResult): void => {
    // source - start position, destination - end position
    const { source, destination } = result;
    if (!destination) return;

    if (fields) {
      const newSectionOrder = Array.from(fields);
      const [movedSection] = newSectionOrder.splice(source.index, 1);
      newSectionOrder.splice(destination.index, 0, movedSection);

      const updatedSectionOrder = newSectionOrder.map((section, index) => {
        return { ...section, section_order: index };
      });
      setFields(updatedSectionOrder);
      setIsDragged(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string): void => {
    setFields((prevValue) => prevValue?.map((el) => {
      if (el.id === id) {
        el.name = event.target.value;
        return el;
      }
      return el;
    }));
  };

  const handleAddCategory = (): void => {
    dispatch(addNewCategory({ menu_id, collection: { name: "Новая коллекция", collection: "" } }));
  };

  const handleDeleteSection = (section: any): void => {

    dispatch(deleteCategory({ menu_id, section: { id: section[0].id, is_deleted: true, }, is_wolt: true }));
  };

  const handleAlert = (section: any): void => {
    const customSwalButtons = Swal.mixin({
      customClass: {
        container: styles.container,
        confirmButton: styles.confirm,
        cancelButton: styles.cancel,
        popup: styles.popup,
      },
      showCancelButton: true,
      reverseButtons: true,
    });

    customSwalButtons.fire({
      title: "Удаление категории",
      html: `Вы уверены, что хотите удалить <br/> категорию ${section[0].name}<br/><br/><br/>`,
      confirmButtonText: "Подтвердить",
      cancelButtonText: "Отмена",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteSection(section);
      }
    });
  };

  const handleChangeDescription = (id: string, type: DescriptionTypes, event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFields((prevValue) => prevValue?.map((el : { id: string, description: string }) => {
      if (el.id === id) {
        switch (type) {
          case DescriptionTypes.ADD:
            el.description = "Новое описание";
            break;
          case DescriptionTypes.CHANGE:
            el.description = event?.target.value!;
            break;
          case DescriptionTypes.DELETE:
            el.description = "";
            break;
          default:
            break;
        }
      }
      return el;
    }));
  };

  React.useEffect(() => {
    setFields(menu_collections?.filter(item => !item.is_deleted));
  }, [menu_collections]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' PaperProps={{ style: { maxWidth: 840, width: '100%', borderRadius: 20, padding: '30px 40px', boxShadow: 'common.white', zIndex: 5 } }} >
      <Box p="10px" overflow="scroll" maxHeight="700px">
        <Typography fontWeight="600" fontSize="25px" mb="40px">
          Переименование категории
        </Typography>
        <form onSubmit={onSubmit} >
          <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd} >
            <Droppable droppableId="item">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {fields?.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index} >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}

                        >
                          <Box display="flex" flexDirection="row" alignItems="center">
                            <Input
                              label={`Коллекция ${index + 1}`}
                              fullWidth
                              value={item.name}
                              onChange={(e) => handleChange(e, item.id)}
                            />
                            <Box mt="22px" ml='5px'>
                              <Button onClick={() => handleAlert([item])} sx={{ "&:hover": { color: "#AB353F" } }} >
                                <DeleteIcon />
                              </Button>
                            </Box>
                          </Box>

                          {item.description
                          ? <Box display="flex" flexDirection="row" alignItems="center" mt="10px" width='90%'>
                              <Box width="25px" marginRight="25px" />
                              <Textarea
                                label={`Описание коллекции ${index + 1}`}
                                fullWidth
                                value={item.description}
                                onChange={(e) => handleChangeDescription(item.id, DescriptionTypes.CHANGE, e)}
                              />
                              <Box mt="22px" ml='5px'>
                                <Button onClick={() => handleChangeDescription(item.id, DescriptionTypes.DELETE)}>
                                  <Typography color="#C4C3C5">X</Typography>
                                </Button>
                              </Box>
                            </Box>
                          : <Box mt="4px" ml='20px' color='#656665'>
                              <Button
                                startIcon={<img src={AddIcon} alt="AddIcon" />}
                                onClick={() => handleChangeDescription(item.id, DescriptionTypes.ADD)}
                              >
                                <Typography color="#656665" ml="10px" fontSize="16px">Добавить описание коллекции {index + 1}</Typography>
                              </Button>
                            </Box>
                          }
                          <Box mb="20px" />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Box sx={{ mt: isDragged ? 20 : 5 }} >
            <Button
              startIcon={<img src={AddIcon} alt="" />}
              onClick={handleAddCategory}
              style={{
                backgroundColor: "#E8E8E9",
              }}
            >
              Добавить коллекцию
            </Button>
            <Box mb="50px" />
          </Box>

          <Box display="flex" sx={{ float: "right" }} height="50px">
            <Button onClick={handleClose}>Отменить</Button>
            <Box width="20px" />
            <Button
              disabled={btnSubmitStatus}
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#025F3E", '&:hover': { boxShadow: 'none', backgroundColor: '#07714B' } }}
            >
              Сохранить и опубликовать
            </Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
});