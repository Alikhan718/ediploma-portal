import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Chip, Link, useMediaQuery} from "@mui/material";
import {ReactComponent as SingleCheck} from "@src/assets/icons/single check.svg";
import SmartContractIcon from "@src/assets/icons/contractIcon.png";
import {ReactComponent as EtherScanIcon} from "@src/assets/icons/Etherscan.svg";
import styles from "../DiplomaDetailsPage.module.css";
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {selectGraduateAttributes} from "@src/store/diplomas/selectors";
import {isAuthenticated} from "@src/utils/userAuth";
import {Button, Modal} from "@src/components";
import NeedAuthorizationPic from "@src/assets/example/requireAuthorizationPic.svg";
import {routes} from "@src/shared/routes";
import {useNavigate} from "react-router-dom";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const SwitchDetails: React.FC = () => {
    const [value, setValue] = React.useState(0);
    const [openModal, setOpenModal] = React.useState(false);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if (newValue == 1 && !isAuthenticated()) {
            setOpenModal(true);
        } else {
            setValue(newValue);
        }
    };
    const graduateAttributes = useSelector(selectGraduateAttributes);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getQueryWidth = () => {
        const matchesLg = useMediaQuery('(min-width:1200px)');
        const matchesMd = useMediaQuery('(max-width:1180px)');
        const matchesSm = useMediaQuery('(max-width:768px)');
        const matchesXs = useMediaQuery('(max-width:576px)');
        if (matchesXs) return "80%";
        if (matchesSm) return "60%";
        if (matchesMd) return "40%";
        if (matchesLg) return "25%";
    };
    return (

        <Box sx={{width: '100%'}}>
            <Modal
                open={openModal}
                handleClose={() => setOpenModal(false)}
                maxWidth={getQueryWidth()}
                width={getQueryWidth()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>

                    <img src={NeedAuthorizationPic} alt=""/>
                    <Typography textAlign='center' mb={".5rem"} id="modal-modal-title" fontSize='1rem'
                                fontWeight='600'
                                variant="h6"
                                component="h2">
                        Для использования требуется авторизация
                    </Typography>
                    <Button variant='contained' sx={{
                        marginTop: "1rem",
                        padding: "1rem",
                        width: "80%",
                        fontSize: "1rem",
                        fontWeight: "600",
                        borderRadius: "2rem"
                    }} onClick={() => {
                        navigate(routes.login);
                    }}>Авторизоваться</Button>
                </Box>
            </Modal>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Проверка" {...a11yProps(0)} />
                    <Tab label="Данные" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box display='flex' mb="1rem">
                    <Typography className={styles.textMd} fontWeight='700' fontSize={"1.5rem"}>
                        Статус:
                    </Typography>
                    <Chip color="success" style={{marginLeft: "1rem"}}
                          className={cn(styles.MobMt0, styles.mt02)}
                          icon={<SingleCheck style={{marginLeft: ".5rem"}}/>}
                          label={<Typography className={cn(styles.textMd)}
                                             sx={{marginRight: ".5rem"}}>Подтвержден</Typography>} variant="outlined"/>
                </Box>
                <Box display='flex' flexDirection="column">
                    <Typography className={styles.textMd} fontWeight='700' fontSize={"1.25rem"}>
                        Выпустил диплом:
                    </Typography>
                    <Typography className={styles.textMd} fontSize={"1.25rem"}>
                        Kazakh British technical University
                    </Typography>
                </Box>

                <Box display='flex' flexDirection="column" mt='2rem'>
                    <Link href={'https://etherscan.io/address/0xbac7239d8c4313a00ae1bcde567c1d78bfac84d7'}
                          sx={{textDecoration: "none"}} target={'_blank'}>
                        <Box display='flex'>
                            <Box display='flex' mr='.7rem' justifyContent='center' width='2.3rem'>
                                <EtherScanIcon className={cn(styles.mobPb1)}/>
                            </Box>
                            <Typography className={styles.textMd} fontWeight='600' color='gray' fontSize={"1.5rem"}>
                                Посмотреть на EtherScan
                            </Typography>
                        </Box>
                    </Link>
                    <Link href={'https://etherscan.io/address/0xbac7239d8c4313a00ae1bcde567c1d78bfac84d7#code'}
                          sx={{textDecoration: "none"}} target={'_blank'}>
                        <Box display='flex' mt='.5rem'>
                            <Box display='flex' mr='.7rem' justifyContent='center' width='2.3rem'>
                                <img className={styles.iconSm} src={SmartContractIcon}/>
                            </Box>
                            <Typography className={styles.textMd} fontWeight='600' color='gray' fontSize={"1.5rem"}>
                                Посмотреть на Smart Contract
                            </Typography>
                        </Box>
                    </Link>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box display='flex' flexWrap={"wrap"} flexBasis={"2"} gap='1rem 1rem'>
                    {graduateAttributes ? graduateAttributes.map((data: any) =>
                        <Chip size='medium' key={data.label_en} label={data.label_ru + ": " + data.value}
                              variant={'outlined'}
                              sx={{borderColor: "#0A66C2", color: "#0A66C2", padding: "1.5rem .5rem"}}></Chip>
                    ) : null}
                </Box>
            </TabPanel>
        </Box>
    );
}