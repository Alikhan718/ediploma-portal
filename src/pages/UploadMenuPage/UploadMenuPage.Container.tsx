import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { UploadMenuFormType } from './types';
import { parseMenu, parseMenuSuccess, uploadMenu } from '@src/store/createMenu/reducer';
import { selectUploadedMenu, selectUploadMenuLoader } from '@src/store/createMenu/selector';
import { selectCurrentLocation } from '@src/store/locations/selector';
import { MenuType } from './generator';
import { UploadMenuPageLayout } from './UploadMenuPage.Layout';

const UploadMenuPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadedMenu = useSelector(selectUploadedMenu);
  const uploadMenuLoader = useSelector(selectUploadMenuLoader);
  const currentLocation = useSelector(selectCurrentLocation);

  const [state, setState] = React.useState<UploadMenuFormType>({
    file: null,
    menuName: '',
    menuType: null
  });
  const [step, setStep] = useState(1);
  const [validated, setValidated] = useState(1);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
    if (e.target.files) {

      if (e.target.files[0].type === "application/json") {
        // dispatch(parseMenuSuccess(e.target.files[0]));
        var reader = new FileReader();
        reader.onload = (e) => {
          const data = JSON.parse(e.target?.result?.toString() || "");
          dispatch(parseMenuSuccess(data));
        };
        reader.readAsText(e.target.files[0]);
      } else {
        let res = await convertToBase64(e.target.files[0]);
        const payload = { filename: e.target.files[0].name, base64_data: res.toString().split(",")[1] };
        dispatch(parseMenu(payload));
      }
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
      setValidated(validated + 1);
    }

  };

  const convertToBase64 = (file: File): any => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const payload = {
      restaurant_id: currentLocation,
      menu_name: state.menuName,
      delivery: state.menuType || MenuType.GLOVO,
      menu: state.menuType === MenuType.GLOVO ? { data: uploadedMenu } : uploadedMenu,
      navigate,
      menuType: state.menuType
    };
    dispatch(uploadMenu(payload));
  };
  return (
    <UploadMenuPageLayout
      state={state}
      step={step}
      validated={validated}
      setStep={setStep}
      uploadedMenu={uploadedMenu}
      uploadMenuLoader={uploadMenuLoader}
      handleChange={handleChange}
      onSubmit={onSubmit}
    />
  );
};
export default UploadMenuPage;