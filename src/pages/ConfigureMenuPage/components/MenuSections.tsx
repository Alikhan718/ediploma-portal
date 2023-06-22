import React, { memo, useState } from "react";

import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { Box, Typography, Dialog } from "@mui/material";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

import { Button, Input, Textarea } from "@src/components";
import AddIcon from '@src/assets/icons/plus.png';
import styles from "./MenuSections/Alert.module.css";
import { ReactComponent as ArrowIcon } from '@src/assets/icons/arrowRightSection.svg';
import { ReactComponent as DeleteIcon } from "@src/assets/icons/delete_outline.svg";
import { addNewCollection, updateCollection, addNewCategory, deleteCollection, deleteCategory } from "@src/store/menu/actionCreators";
import { DescriptionTypes } from "../generator";

interface MenuSectionsProps {
  menu_collections: Array<any> | undefined,
  menu_id: string,
  open: boolean,
  btnSubmitStatus: boolean,
  handleClose: () => void
};

export const MenuSection: React.FC<MenuSectionsProps> = memo(function MenuSection(props: MenuSectionsProps) {
  const { menu_collections, menu_id, open, handleClose, btnSubmitStatus } = props;
  const dispatch = useDispatch();

  const [fields, setFields] = useState<any[] | undefined>([]);
  // using for fixing position of button, when drag is activate
  const [isDragged, setIsDragged] = useState(false);

  const onSubmit = (event: any): void => {
    event.preventDefault();
    const allSections = fields?.map((section) => section.sections).flat();
    dispatch(updateCollection({ menu_id, data: { "collections": fields, "sections": allSections } }));
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
        return { ...section, collection_order: index + 1 };
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

  const handleChangeSection = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id_section: string): void => {
    setFields((prevValue) => prevValue?.map((el) => {
      el.sections?.map((section: { id: string; name: string; }) => {
        if (section.id === id_section) {
          section.name = event.target.value;
          return el;
        }
      });
      return el;
    }));
  };

  const handleAddCollection = (): void => {
    dispatch(addNewCollection({ menu_id, name: "Новая коллекция" }));
  };

  const handleAddCategory = (id: string): void => {
    dispatch(addNewCategory({ menu_id, collection: { name: "Новая категория", collection: id } }));
  };

  const handleDeleteCategory = (section: any): void => {
    section[0].is_deleted = true;
    dispatch(deleteCollection({ menu_id, collection: { id: section[0].id, is_deleted: true } }));
  };

  const handleDeleteSection = (section: any): void => {
    section.is_deleted = true;
    dispatch(deleteCategory({ menu_id, section: { id: section.id, is_deleted: true } }));
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
        handleDeleteCategory(section);
      }
    });
  };

  const handleChangeDescription = (id: string, type: DescriptionTypes, event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFields((prevValue) => prevValue?.map((el) => {
      el.sections?.map((section: { id: string; description: any[] | null }) => {
        if (section.id === id) {
          switch (type) {
            case DescriptionTypes.ADD:
              if (section.description === null || section.description[0].Value === "") {
                section.description = [{ LanguageCode: "ru", Value: "Новое описание" }];
              }
              break;
            case DescriptionTypes.CHANGE:
              section.description![0].Value = event?.target.value!;
              break;
            case DescriptionTypes.DELETE:
              section.description![0].Value = "";
              break;
            default:
              break;
          }
        }
      });
      return el;
    }));
  };

  React.useEffect(() => {
    setFields(menu_collections?.map(item => ({
      ...item,
      sections: item.sections?.filter(
        (section: { is_deleted: boolean; }) => section.is_deleted !== true
      )
    }))
      .sort((a, b) => a.collection_order - b.collection_order)
      .filter(item => item.is_deleted !== true));
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
                          {/* COLLECTIONS */}
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

                          <Box mb="10px" />
                          {/* SECTIONS */}
                          <Box mt="15px" display="flex" flexDirection="column">
                            {item.sections?.map((section: any, sectionIndex: number) => (
                              <Box key={section.id} width="90%" mb="12px">
                                <Box display="flex" flexDirection="row" alignItems="center" mt="10px">
                                  <Box marginTop="22px" marginRight="25px">
                                    <ArrowIcon />
                                  </Box>
                                  <Input
                                    label={`Название категории ${sectionIndex + 1}`}
                                    fullWidth
                                    value={section.name}
                                    onChange={(e) => handleChangeSection(e, section.id)}
                                  />
                                  <Box mt="22px" ml='5px'>
                                    <Button onClick={() => handleDeleteSection(section)}>
                                      <Typography color="#C4C3C5">X</Typography>
                                    </Button>
                                  </Box>
                                </Box>
                                {/* description */}
                                
                                {section?.description
                                ? <Box display="flex" flexDirection="row" alignItems="center" mt="10px">
                                    <Box width="25px" marginRight="25px" />
                                    <Textarea
                                      label={`Описание категории ${sectionIndex + 1}`}
                                      fullWidth
                                      value={section.description[0].Value}
                                      onChange={(e) => handleChangeDescription(section.id, DescriptionTypes.CHANGE, e)}
                                    />
                                    <Box mt="22px" ml='5px'>
                                      <Button onClick={() => handleChangeDescription(section.id, DescriptionTypes.DELETE)}>
                                        <Typography color="#C4C3C5">X</Typography>
                                      </Button>
                                    </Box>
                                  </Box>
                                : <Box mt="4px" ml='40px' color='#656665'>
                                    <Button
                                      startIcon={<img src={AddIcon} alt="AddIcon" />}
                                      onClick={() => handleChangeDescription(section.id, DescriptionTypes.ADD)}
                                    >
                                      <Typography color="#656665" ml="10px" fontSize="16px">Добавить описание категории {sectionIndex + 1}</Typography>
                                    </Button>
                                  </Box>
                                }
                              </Box>
                            ))}
                            <Box mt="7px" ml='40px'>
                              <Button
                                startIcon={<img src={AddIcon} alt="AddIcon" />}
                                onClick={() => handleAddCategory(item.id)}
                              >
                                <Typography color="#656665" ml="10px" fontSize="16px">Добавить категорию {item.sections?.length + 1}</Typography>
                              </Button>
                            </Box>
                          </Box>
                          <Box mb="10px" />

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
              onClick={handleAddCollection}
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