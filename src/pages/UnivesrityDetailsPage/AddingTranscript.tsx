import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import excel from "./../../assets/icons/File_check.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "@src/store/auth/actionCreators";
import { selectUserState } from "@src/store/auth/selector";
import { setSnackbar } from "@src/store/generals/actionCreators";
import { useNavigate } from "react-router-dom";
import { selectLanguage } from "@src/store/generals/selectors";
import axios from "axios";

const AddingTranscript: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const lang = useSelector(selectLanguage);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const userState = useSelector(selectUserState);
  const dispatch = useDispatch();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[ 0 ] || null;
    if (!uploadedFile) {
      return;
    }

    setFile(uploadedFile);
    setUploadError(null);
    setUploadSuccess(false);
    setIsUploading(true);

    try {
      // Проверяем, что у нас есть university_id
      if (!userState?.university_id) {
        throw new Error("University ID не найден");
      }

      // Создаем FormData для отправки файла
      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("university_id", userState.university_id.toString());

      // Отправляем запрос на парсинг транскрипта
      const response = await axios.post(
        `https://generator.ediploma.kz/transcript/parse/${userState?.university_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000,
        }
      );

      // Обрабатываем ответ
      if (response.data.error) {
        throw new Error(response.data.error);
      }

      // Успешная загрузка
      setUploadSuccess(true);

      // Показываем сообщение об успехе
      dispatch(setSnackbar({
        visible: true,
        message: "Транскрипт успешно загружен и обрабатывается",
        status: "success"
      }));

    } catch (error: any) {
      console.error("Ошибка загрузки транскрипта:", error);

      // Формируем сообщение об ошибке
      let errorMessage = "Произошла ошибка при загрузке файла";

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.status === 413) {
        errorMessage = "Файл слишком большой";
      } else if (error.response?.status === 400) {
        errorMessage = "Некорректный формат файла";
      }

      setUploadError(errorMessage);

      dispatch(setSnackbar({
        visible: true,
        message: errorMessage,
        status: "error"
      }));

    } finally {
      setIsUploading(false);
    }
  };

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  React.useEffect(() => {
    // Загружаем профиль пользователя при монтировании
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <Box sx={ {
      textAlign: "center",
      backgroundColor: "#FAFBFF",
      width: '95%',
      borderRadius: '30px',
      marginLeft: '2rem',
      padding: '40px',
      '@media (max-width: 998px)': {
        padding: '15px',
        marginLeft: '1rem'
      },
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    } }>
      <Typography variant="h4" fontWeight={ 600 } textAlign="center" sx={ {
        paddingBottom: '40px',
        '@media (max-width: 998px)': {
          fontSize: '1.5rem'
        },
      } }>
        { lang === 'ru' ? 'Загрузить транскрипт' : lang === 'kz' ? 'Транскрипт жүктеу' : 'Upload Transcript' }
      </Typography>

      {/* Показываем ошибку если есть */ }
      { uploadError && (
        <Alert
          severity="error"
          sx={ {
            width: '90%',
            mb: 3,
            borderRadius: '10px',
            mx: 'auto'
          } }
          onClose={ () => setUploadError(null) }
        >
          { uploadError }
        </Alert>
      ) }

      {/* Показываем успех если есть */ }
      { uploadSuccess ? (
        <Box sx={ {
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '20px',
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
        } }>
          <Typography variant="h5" color="success.main" gutterBottom sx={ { mb: 2 } }>
            ✅ { lang === 'ru' ? 'Успешно!' : lang === 'kz' ? 'Сәтті!' : 'Success!' }
          </Typography>

          <Typography variant="body1" sx={ { mb: 3 } }>
            { lang === 'ru'
              ? 'Транскрипт успешно загружен и находится в обработке.'
              : lang === 'kz'
                ? 'Транскрипт сәтті жүктелді және өңделуде.'
                : 'Transcript successfully uploaded and is being processed.' }
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={ { mb: 3 } }>
            { lang === 'ru'
              ? 'Файл: '
              : lang === 'kz'
                ? 'Файл: '
                : 'File: ' }
            <strong>{ file?.name }</strong>
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={ { mt: 2, borderRadius: '15px' } }
            onClick={ () => window.location.reload() }
          >
            { lang === 'ru' ? 'Загрузить еще один файл' : lang === 'kz' ? 'Тағы бір файл жүктеу' : 'Upload another file' }
          </Button>
        </Box>
      ) : (
        <>
          <Box
            sx={ {
              width: "90%",
              height: "300px",
              margin: "0 auto",
              borderRadius: "15px",
              border: "2px dashed #3B82F6",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: isUploading ? "not-allowed" : "pointer",
              opacity: isUploading ? 0.7 : 1,
              backgroundColor: isUploading ? '#f5f5f5' : 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: isUploading ? '#3B82F6' : '#2563eb',
                backgroundColor: isUploading ? '#f5f5f5' : '#f8fafc',
              }
            } }
            onClick={ isUploading ? undefined : handleChooseFileClick }
          >
            { isUploading ? (
              <>
                <CircularProgress sx={ { mb: 3 } }/>
                <Typography variant="h6" color="primary">
                  { lang === 'ru' ? 'Загрузка файла...' : lang === 'kz' ? 'Файл жүктелуде...' : 'Uploading file...' }
                </Typography>
              </>
            ) : (
              <>
                <img src={ excel } style={ { width: '60px', paddingBottom: '20px' } }/>
                <Typography variant="h6" sx={ { mb: 1 } }>
                  { lang === 'ru' ? 'Нажмите для выбора файла' : lang === 'kz' ? 'Файлды таңдау үшін басыңыз' : 'Click to select file' }
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={ { mb: 2 } }>
                  { lang === 'ru'
                    ? 'Поддерживаемые форматы: .xls, .xlsx'
                    : lang === 'kz'
                      ? 'Қолдау көрсетілетін форматтар: .xls, .xlsx'
                      : 'Supported formats: .xls, .xlsx' }
                </Typography>

                { file && (
                  <Typography variant="body2" sx={ {
                    mt: 2,
                    color: '#666',
                    backgroundColor: '#f0f9ff',
                    padding: '8px 16px',
                    borderRadius: '20px'
                  } }>
                    { lang === 'ru' ? 'Выбран файл:' : lang === 'kz' ? 'Таңдалған файл:' : 'Selected file:' } { file.name } ({ Math.round(file.size / 1024) } KB)
                  </Typography>
                ) }

                <input
                  type="file"
                  id="file-input"
                  accept=".xls, .xlsx, .xlsm"
                  onChange={ handleFileUpload }
                  style={ { display: "none" } }
                  ref={ fileInputRef }
                  disabled={ isUploading }
                />
              </>
            ) }
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={ {
              marginTop: 3,
              borderRadius: '15px',
              padding: '12px 24px'
            } }
            onClick={ () => {
              window.open("https://generator.ediploma.kz/get-file/files/transcript_template.xlsx", "_blank");
            } }
          >
            { lang === 'ru' ? 'Скачать шаблон' : lang === 'kz' ? 'Үлгіні жүктеу' : 'Download template' }
          </Button>

          <Box sx={ {
            backgroundColor: '#e8f4fd',
            width: '90%',
            margin: '30px auto 0',
            textAlign: 'left',
            padding: '20px',
            borderRadius: '15px'
          } }>
            <Typography sx={ { color: '#3B82F6', fontWeight: 600, mb: 1 } }>
              { lang === 'ru' ? 'Примечание' : lang === 'kz' ? 'Ескерту' : 'Note' }
            </Typography>
            <Typography sx={ {
              color: '#64748b'
            } }>
              { lang === 'ru'
                ? 'Загрузите файл Excel с транскриптами студентов. После загрузки файл будет обработан автоматически.'
                : lang === 'kz'
                  ? 'Студенттердің транскрипттері бар Excel файлын жүктеңіз. Жүктегеннен кейін файл автоматты түрде өңделеді.'
                  : 'Upload an Excel file with student transcripts. After uploading, the file will be processed automatically.' }
            </Typography>
          </Box>
        </>
      ) }
    </Box>
  );
};

export default AddingTranscript;