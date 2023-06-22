import { SelectChangeEvent } from "@mui/material";
import { Button } from "@src/components";
import { Step1 } from "@src/components/Attribute/step1";
import { Step2 } from "@src/components/Attribute/step2";
import { Step3 } from "@src/components/Attribute/step3";
import { addAttributeToAttributeGroup, fetchAttributeGroup, fetchAttributesAndProducts } from "@src/store/attributes/actionCreators";
import { selectAttributeGroupList, selectAttributeLoader, selectAttributes } from "@src/store/attributes/selectors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface IAddAggregatorsForm {
  product_id: string | undefined,
  menu_id: string,
  setModalOpen: (open: boolean) => void
  handleAttributeGroupe: (selected_attribute: any) => void;
}
interface IForm {
  attribute_group_name: string
  min: number
  max: number
  attributes: any[]
  products: any[]
}

export const AddAggregatorsForm: React.FC<IAddAggregatorsForm> = ({ menu_id, product_id, setModalOpen, handleAttributeGroupe }) => {
  const dispatch = useDispatch();
  const attributesGroupList = useSelector(selectAttributeGroupList);
  const attributes = useSelector(selectAttributes);
  const isFetching = useSelector(selectAttributeLoader);
  const [step, setStep] = React.useState(1);
  const [attributeId, setAttributeId] = React.useState('0');
  const [form, setForm] = React.useState<IForm>({
    attribute_group_name: "",
    min: 0,
    max: 1,
    attributes: [],
    products: []
  });

  const handleNameChange = (newName: string): void => {
    setForm({
      ...form,
      attribute_group_name: newName
    });
  };
  const handleMinMaxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (Number(e.target.value) >= 0) {
      setForm({
        ...form,
        [e.target.name]: Number(e.target.value)
      });
    }
  };
  const handleBack = (): void => {
    if (step - 1 !== 0) {
      setStep(step - 1);
    } else {
      setModalOpen(false);
    }
  };
  const handleNext = (): void => {
    if (attributeId === '0') {
      if (step + 1 < 4) {
        if (step + 1 === 3) {
          dispatch(fetchAttributesAndProducts({
            menu_id, product_id,
            attribute_group_name: form.attribute_group_name,
            min: form.min, max: form.max
          }));
        }
        setStep(step + 1);
      }
    } else {



      handleAttributeGroupe(attributeId);
      setModalOpen(false);
    }
  };

  const handleChange = (e: SelectChangeEvent<any>): void => {
    if (e.target.value === "all") {
      setForm({ ...form, attributes });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.name === 'products'
          ? [...form.products, e.target.value]
          : !isExist(e.target.value.ext_id, form.attributes) ? [...form.attributes, e.target.value] : [...form.attributes]
      });
    }

  };
  const isExist = (id: string, items: any[]): boolean => {
    for (const i of items) {
      if (id === i.ext_id) return true;
    }
    return false;
  };
  const handleDeleteAttribute = (id: string): void => (
    setForm({ ...form, attributes: form.attributes.filter((atr: any) => atr.ext_id !== id) })
  );
  const handleDeleteProduct = (id: string): void => (
    setForm({ ...form, products: form.products.filter((prod: any) => prod.id !== id) })
  );

  const handleSubmit = (): void => {
    const payload = {
      menu_id,
      product_id,
      attribute_group_name: form.attribute_group_name,
      attributes: form.attributes,
      products: form.products
    };
    dispatch(addAttributeToAttributeGroup(payload));
  };

  React.useEffect(() => {
    dispatch(fetchAttributeGroup(menu_id));
  }, []);

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", }}>
        <h1>Новая группа аттрибутов</h1>
        {step == 1 &&
          <Step1
            menu_id={menu_id}
            name={form.attribute_group_name}
            attributesGroupList={attributesGroupList}
            isFetching={isFetching}
            attributeId={attributeId}
            setAttributeId={setAttributeId}
            handleChange={handleNameChange} />}
        {step == 2 && <Step2 min={form.min} max={form.max} handleChange={handleMinMaxChange} />}
        {step == 3 && <Step3 handleDeleteAttribute={handleDeleteAttribute} handleDeleteProduct={handleDeleteProduct} handleChange={handleChange} selected_attributes={form.attributes} selected_products={form.products} />}
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
        <Button buttonSize='s' style={{ margin: ".1em" }} onClick={handleBack} variant='text' color='onyx'>
          {step === 1 ? 'Отмена' : 'Назад'}
        </Button>
        {
          step !== 3
            ? <Button buttonSize='s' style={{ margin: ".1em" }} onClick={handleNext} variant='contained' color='success'>
              Далее
            </Button>
            : <Button buttonSize='s' style={{ margin: ".1em" }} onClick={handleSubmit} variant='contained' color='success'>
              Сохранить
            </Button>
        }
      </div>
    </React.Fragment>
  );
};
