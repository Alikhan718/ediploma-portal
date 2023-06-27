import React, {useState, useEffect} from 'react';
import {Alert, Box, Button, Card, CardMedia, Snackbar, Typography} from '@mui/material';
import {ReactComponent as CalendarIcon} from '@src/assets/icons/calendar.svg';
import {ReactComponent as FileCheckIcon} from '@src/assets/icons/Lesson.svg';
import {ReactComponent as CertificateIcon} from '@src/assets/icons/Cerificate.svg';
import {ReactComponent as DownloadIcon} from '@src/assets/icons/download.svg';
import {ReactComponent as ShareIcon} from '@src/assets/icons/share.svg';
import {ReactComponent as QRIcon} from '@src/assets/icons/qr-code.svg';
import exampleImage from "@src/assets/example/diplomaFullHD.jpg";
import {SwitchDetails} from "@src/pages/DiplomaDetailsPage/components/SwitchDetails";
import QRCode from 'react-qr-code';
import {ethers} from 'ethers';
import {create, urlSource} from 'ipfs-http-client';
import * as http from "http";
import {Modal} from "@src/components";
import {setSnackbar} from "@src/store/generals/actionCreators";
import {put} from "redux-saga/effects";
import {handleLink} from "@src/utils/link";

interface DiplomaData {
    name: string;
    description: string,
    image: string,
    degree: string;
    specialization: string;
    date: string;
    code: string;
    type: string;
}

export const DiplomaDetailsPageLayout: React.FC = () => {
        const currentUrl = window.location.href;
        const [data, setData] = useState<any>();
        const [alertOpen, setAlertOpen] = useState(false);
        const [showQRCode, setShowQRCode] = useState(false);

        const handleQRCodeClose = () => {
            setShowQRCode(false);
        };
        const handleAlertClose = () => {
            setAlertOpen(false);
        };
        const handleQRCodeButtonClick = () => {
            setShowQRCode(true);
        };

        const fetchDiplomaMetadata = async () => {
            const provider = new ethers.InfuraProvider('sepolia', '268c2c5ab3de4a7c9bfa49f0122db50a');
            const contractAddress = '0xF96910fb6F6b4991072E37584D84FE33f77B8b28';
            const contractABI = [
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                }, {
                    "anonymous": false,
                    "inputs": [{
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }, {"indexed": true, "internalType": "address", "name": "approved", "type": "address"}, {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }],
                    "name": "Approval",
                    "type": "event"
                }, {
                    "anonymous": false,
                    "inputs": [{
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }, {"indexed": true, "internalType": "address", "name": "operator", "type": "address"}, {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }],
                    "name": "ApprovalForAll",
                    "type": "event"
                }, {
                    "anonymous": false,
                    "inputs": [{
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    }, {"indexed": true, "internalType": "address", "name": "to", "type": "address"}, {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }],
                    "name": "Transfer",
                    "type": "event"
                }, {
                    "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function"
                }, {
                    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
                    "name": "balanceOf",
                    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
                    "stateMutability": "view",
                    "type": "function"
                }, {
                    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
                    "name": "burnDiploma",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }, {
                    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
                    "name": "getApproved",
                    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
                    "stateMutability": "view",
                    "type": "function"
                }, {
                    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    }],
                    "name": "isApprovedForAll",
                    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
                    "stateMutability": "view",
                    "type": "function"
                }, {
                    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
                        "internalType": "uint256",
                        "name": "numberOfDiplomas",
                        "type": "uint256"
                    }], "name": "mintDiplomas", "outputs": [], "stateMutability": "nonpayable", "type": "function"
                }, {
                    "inputs": [],
                    "name": "name",
                    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
                    "stateMutability": "view",
                    "type": "function"
                }, {
                    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
                    "name": "ownerOf",
                    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
                    "stateMutability": "view",
                    "type": "function"
                }, {
                    "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    }, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
                    "name": "safeTransferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }, {
                    "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    }, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}, {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function"
                }, {
                    "inputs": [{"internalType": "address", "name": "operator", "type": "address"}, {
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function"
                }, {
                    "inputs": [{"internalType": "bytes4", "name": "interfaceId", "type": "bytes4"}],
                    "name": "supportsInterface",
                    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
                    "stateMutability": "view",
                    "type": "function"
                }, {
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
                    "stateMutability": "view",
                    "type": "function"
                }, {
                    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
                    "name": "tokenURI",
                    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
                    "stateMutability": "view",
                    "type": "function"
                }, {
                    "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    }, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
                    "name": "transferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }]; // Replace with your contract's ABI
            const ipfs = create();

            const contract = new ethers.Contract(contractAddress, contractABI, provider);

            // Call the contract's function to retrieve the diploma metadata
            const metadata = await contract.tokenURI(1);
            const link = metadata.replace("ipfs://", "https://ipfs.io/ipfs/");
            console.log(link);
            await fetch(link)
                .then((res) => res.json())
                .then((data) => {
                    const date = new Date(
                        data.attributes.filter(
                            (val: any) => val.name == "protocol_en")[0]
                            .value
                            .replace("Dated on ", "")
                            .split(", minute ")[0]
                    ).toLocaleDateString("en-GB");
                    data.date = date.replaceAll("/", ".");
                    console.log(data);
                    setData(data);

                })
                .catch((err) => {
                    console.log(err.message);
                });
        };

        useEffect(() => {
            fetchDiplomaMetadata();
        }, []);
        return (
            <Box display='flex' flexWrap='wrap' justifyContent='center' gap='0 3rem' pt='3rem'>
                <Box width='32%' display='flex' flexDirection="column">
                    <Card sx={{borderRadius: "1.4rem", background: "#CED4D3"}}>
                        <CardMedia
                            component="img"
                            sx={{padding: "1.4rem", borderRadius: "1.4rem"}}
                            image={data && data.image ? data.image : exampleImage}
                            alt="University Image"
                        >
                        </CardMedia>
                    </Card>
                    <Box display='flex' mt={"2rem"} width={"100%"} mx='auto' justifyContent='space-between'>
                        <Button defaultValue="download" startIcon={<DownloadIcon/>} variant='outlined'
                                onClick={() => {
                                    let link = data && data.image ? data.image : "";
                                    handleLink(link);
                                }}
                                sx={{borderColor: "#0A66C2", borderRadius: "18px"}}>
                            Скачать
                        </Button>
                        <Button startIcon={<ShareIcon/>} variant='outlined'
                                onClick={() => {
                                    navigator.clipboard.writeText(currentUrl);
                                    setAlertOpen(true);
                                }}
                                sx={{borderColor: "#0A66C2", borderRadius: "18px"}}>
                            Поделиться
                        </Button>
                        <Button startIcon={<QRIcon/>} variant='outlined'
                                onClick={handleQRCodeButtonClick}
                                sx={{borderColor: "#0A66C2", borderRadius: "18px"}}>
                            QR-код
                        </Button>
                    </Box>
                </Box>
                <Box width='45%' display='flex' flexDirection='column' gap='1rem' pt='1.5rem'>
                    <Typography fontWeight='700' fontSize='1.4rem'>
                        {data && data.name ? data.name : ''}
                    </Typography>
                    <Box>

                        <Box display='flex' mb='.5rem'>
                            <Typography fontSize='1.4rem' mr='.5rem'>
                                Cтепень:
                            </Typography>
                            <Typography fontSize='1.4rem'
                                        fontWeight='700'>{data && data.attributes ? data.attributes.filter((attr: any) => attr.name == "degree_en")[0].value.replace("was awarded the degree of ", "").replace("of", "") : ""}</Typography>
                        </Box>

                        <Box display='flex' mb='.5rem'>
                            <Typography fontSize='1.4rem' mr='.5rem'>Специальность:</Typography>
                            <Typography fontSize='1.4rem'
                                        fontWeight='700'>{data && data.attributes ? data.attributes.filter((attr: any) => attr.name == "qualification_ru")[0].value.substring(data.attributes.filter((attr: any) => attr.name == "qualification_ru")[0].value.search("«")) : ""}</Typography>
                        </Box>

                        <Box display='flex' width='100%' gap='2rem' mb='.5rem'>
                            <Box display='flex'>
                                <CalendarIcon style={{marginTop: ".3rem", marginRight: ".5rem"}}/>
                                <Typography fontSize='1.4rem' mr='.5rem'
                                            color="#697B7A">{data && data.date ? data.date : ""}</Typography>
                            </Box>
                            <Box display='flex'>
                                <FileCheckIcon style={{marginTop: ".3rem", marginRight: ".5rem"}}/>
                                <Typography fontSize='1.4rem' mr='.5rem' color="#697B7A">55 555 66667</Typography>
                            </Box>
                            <Box display='flex'>
                                <CertificateIcon style={{marginTop: ".3rem", marginRight: ".5rem"}}/>
                                <Typography fontSize='1.4rem' mr='.5rem' color="#697B7A">Оригинал</Typography>
                            </Box>
                        </Box>
                        <SwitchDetails/>
                    </Box>
                </Box>
                <Modal
                    open={showQRCode}
                    handleClose={handleQRCodeClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box display='flex' width='100%' flexBasis='1' flexWrap={'wrap'} justifyContent='center'>

                        {showQRCode && (
                            <Box my="1rem" width="100%" display="flex" justifyContent="center">
                                <QRCode value={currentUrl}/>
                            </Box>
                        )}
                    </Box>
                </Modal>
                <Snackbar open={alertOpen} autoHideDuration={2000} onClose={handleAlertClose}>
                    <Alert onClose={handleAlertClose} severity="success" sx={{width: '100%'}}>
                        Успешно скопировано!
                    </Alert>
                </Snackbar>
            </Box>

        );
    }
;