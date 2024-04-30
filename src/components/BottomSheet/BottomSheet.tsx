import Sheet, { SheetRef } from 'react-modal-sheet';
import React, { useRef } from 'react';
import { BottomSheetProps } from './BottomSheet.props';
import s from '/BottomSheet.module.css'

const BottomSheet: React.FC<BottomSheetProps> = ({ openBottomSheet, setOpenBottomSheet, children }) => {
    const ref = useRef<SheetRef>();

    const handleClose = () => {
        setOpenBottomSheet(false);
    };

    return (
        <>
            <Sheet
                isOpen={openBottomSheet}
                onClose={() => setOpenBottomSheet(false)}
                snapPoints={[ 810, 300, 0]}
                initialSnap={1}
                style={{ zIndex: 3, }}
            >
                <Sheet.Container style={{paddingBottom: ref.current?.y, zIndex: 3,}} >
                    <Sheet.Header />
                    <Sheet.Content disableDrag style={{padding: '0 24px 40px 24px',}}>
                        <Sheet.Scroller draggableAt="both">
                            {children}
                        </Sheet.Scroller>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop onTap={handleClose} style={{backgroundColor: 'rgba(59, 130, 246, 0.6)'}}/>
            </Sheet>

        </>
    );
}

export default BottomSheet;
