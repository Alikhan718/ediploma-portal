import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Chip, Link} from "@mui/material";
import {ReactComponent as SingleCheck} from "@src/assets/icons/single check.svg";
import SmartContractIcon from "@src/assets/icons/contractIcon.png";
import {ReactComponent as EtherScanIcon} from "@src/assets/icons/Etherscan.svg";

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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Проверка" {...a11yProps(0)} />
                    <Tab label="Данные" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box display='flex' mb="1rem">
                    <Typography fontWeight='700' fontSize={"1.5rem"}>
                        Статус:
                    </Typography>
                    <Chip color="success" style={{marginLeft: "1rem", marginTop: ".2rem"}}
                          icon={<SingleCheck style={{marginLeft: ".5rem"}}/>}
                          label={<Typography sx={{marginRight: ".5rem"}}>Подтвержден</Typography>} variant="outlined"/>
                </Box>
                <Box display='flex' flexDirection="column">
                    <Typography fontWeight='700' fontSize={"1.25rem"}>
                        Выпустил диплом:
                    </Typography>
                    <Typography fontSize={"1.25rem"}>
                        Kazakh British technical University
                    </Typography>
                </Box>

                <Box display='flex' flexDirection="column" mt='2rem'>
                    <Link href={'https://sepolia.etherscan.io/address/0x8759c3180a75e107a90b8d21d15ca4221ce50f51'} sx={{textDecoration: "none"}} target={'_blank'}>
                        <Box display='flex'>
                            <Box display='flex' mr='.7rem' justifyContent='center' width='2.3rem'>
                                <EtherScanIcon/>
                            </Box>
                            <Typography fontWeight='600' color='gray' fontSize={"1.5rem"}>
                                Посмотреть на EtherScan
                            </Typography>
                        </Box>
                    </Link>
                    <Link href={'https://sepolia.etherscan.io/address/0x8759c3180a75e107a90b8d21d15ca4221ce50f51#code'} sx={{textDecoration: "none"}} target={'_blank'}>
                        <Box display='flex' mt='.5rem'>
                            <Box display='flex' mr='.7rem' justifyContent='center' width='2.3rem'>
                                <img src={SmartContractIcon}/>
                            </Box>
                            <Typography fontWeight='600' color='gray' fontSize={"1.5rem"}>
                                Посмотреть на Smart Contract
                            </Typography>
                        </Box>
                    </Link>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box display='flex' flexWrap={"wrap"} flexBasis={"2"} gap='1rem 1rem'>
                    <Chip size='medium' label={'GPA: 3.6'} variant={'outlined'} sx={{borderColor: "#0A66C2", color: "#0A66C2", padding: "1.5rem .5rem"}}></Chip>
                    <Chip size='medium' label={'Регион: город Астана'} variant={'outlined'} sx={{borderColor: "#0A66C2", color: "#0A66C2", padding: "1.5rem .5rem"}}></Chip>
                    <Chip size='medium' label={'ИИН: 150402564256'} variant={'outlined'} sx={{borderColor: "#0A66C2", color: "#0A66C2", padding: "1.5rem .5rem"}}></Chip>
                </Box>
            </TabPanel>
        </Box>
    );
}