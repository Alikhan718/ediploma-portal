import React from 'react';
import {Box, Divider, Typography} from "@mui/material";
import {ICollectionPageHeader} from "@src/pages/CollectionsPage/types";
import {privateNavigations} from "@src/layout/Header/generator";
import {Button} from "@src/components";
import styles from "../CollectionsPage.module.css";
import cn from "classnames";

export const CollectionPageHeader: React.FC<ICollectionPageHeader> = (props) => {
    const {type, setType} = props;
    const collectionTypes = [{type: "diploma", name: "Дипломы"}, {type: "university", name: "Университеты"}];
    return (
        <React.Fragment>


        </React.Fragment>
    );
};
