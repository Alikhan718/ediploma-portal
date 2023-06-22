import React from 'react';
import {Box, Divider, Typography} from "@mui/material";
import {ICollectionPageHeader} from "@src/pages/CollectionsPage/types";
import {privateNavigations} from "@src/layout/Header/generator";
import {Button} from "@src/components";


export const CollectionPageHeader: React.FC<ICollectionPageHeader> = (props) => {
    const {type, setType} = props;
    const [activeNav, setActiveNav] = React.useState(0);

    const handleActiveNav = (navId: number): void => {
        setActiveNav(navId);
    };
    const handleClassName = (isActive: boolean, id: number): string | undefined => {
        isActive && handleActiveNav(id);
        return "";
    };
    return (
        <React.Fragment>
            {privateNavigations.map(nav => (
                <Button key={nav.id} variant='text' className={handleClassName(false, nav.id)}>
                    <Typography
                        variant='h4'
                        color={activeNav === nav.id ? '#0A66C2' : 'gray'}
                        fontWeight='450'>
                        {nav.name}
                    </Typography>
                </Button>
            ))}

        </React.Fragment>
    );
};
