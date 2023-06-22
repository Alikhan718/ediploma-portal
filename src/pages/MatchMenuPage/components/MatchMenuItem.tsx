import React from "react";

import { useSelector } from "react-redux";
import { Box, InputAdornment, ListSubheader, MenuItem, SelectChangeEvent, Typography } from "@mui/material";

import { Button, Input, Select, } from "@src/components";
import { MatchMenuProps } from "./types";
import { ItemHint } from "@src/pages/MenuPage/components/ItemHint";
import { ReactComponent as DeleteIcon } from "@src/assets/icons/delete_outline.svg";
import { ReactComponent as SearchIcon } from "@src/assets/icons/search.svg";
import AddIcon from "@src/assets/icons/plus.png";
import { selectPosProductMatching } from "@src/store/menu/selector";

const SymbolsLimit = 20;

export const MatchMenuItem: React.FC<MatchMenuProps> = (props) => {
	const posProducts = useSelector(selectPosProductMatching);
	const { product, matchAggregatorPos, section, handleDelete } = props;


	const [productId, setProductId] = React.useState(0);
	const [search, setSearch] = React.useState('');

	const handleChange = (e: SelectChangeEvent<any>): void => {
		const { available } = posProducts.find((item: any) => item.product_ext_id === e.target.value);

		matchAggregatorPos(product.id, e.target.value, available, section);
		setProductId(e.target.value);
	};
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSearch(e.target.value);
	};
	const onDeleteProduct = (): void => {
		handleDelete(product.id, product.is_deleted);
	};
	const containsText = (text: string, searchText: string): boolean => {
		return text.toLowerCase().indexOf(searchText ? searchText.toLowerCase() : "") > -1;
	};

	React.useEffect(() => {
		if (product.name) {
			const product_name = product.name ? product.name[0].Value : "";
			const firstItem = posProducts.filter((item: any) => containsText(item.product_name, product_name.slice(0, 3)))[0];
			if (firstItem) {
				setSearch(product_name.slice(0, 3));
			}
		}
	}, [product.name]);

	const filteredProductList = React.useMemo(() => {
		const res = posProducts.filter((product: any) => containsText(product.product_name, search));
		return res;
	}, [search]);

	return (
		<Box
			style={{
				filter: product.is_deleted ? "grayscale(100%)" : "",
				opacity: product.is_deleted ? "0.5" : "1"
			}}
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			padding="20px 0"
			borderBottom='1px solid #E8E8E9'>

			<Box width="50%" display="flex" borderRight='1px solid #E8E8E9'>

				<img style={{
					borderRadius: '10px',
					marginRight: '10px',
				}}
					src={product.images ? product.images[0] : null}
					height="90px"
					width="90px"
				/>

				<Box>
					<Typography variant='h4' fontWeight='600' mb='8px'> {product.name ? product.name[0].Value : null} </Typography>
					<Typography variant='h3' fontWeight='400'>{product.description ? product.description[0].Value : null}</Typography>
				</Box>
			</Box>

			<Box width="20%"></Box>

			{/* SELECT PRODUCT FROM IIKO  */}
			<Box
				gap="5px"
				width="40%"
				height="80px"
				display="flex"
				alignItems="center"
				paddingLeft="20px"
				borderLeft='1px solid #E8E8E9' >
				<Select
					fullWidth
					value={productId}
					onChange={handleChange}
					MenuProps={{ autoFocus: false }}
				>
					<MenuItem value={0} disabled>Выберите id блюда в iiko</MenuItem>
					<ListSubheader sx={{ padding: 0 }}>

						<Input
							autoFocus
							fullWidth
							inputSize="l"
							size="small"
							value={search}
							placeholder="Search"
							onChange={handleSearch}
							startAdornment={
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>}
							onKeyDown={(e) => {
								if (e.key !== "Escape") {
									e.stopPropagation();
								}
							}}
						/>
					</ListSubheader>

					{filteredProductList?.length > 0
						&& filteredProductList?.map((item: any, index: number) => {
							return <MenuItem
								onMouseEnter={
									() => {
										if (document.getElementById("item" + index) && item.product_name.length > SymbolsLimit) {
											document.getElementById("item" + index)!.style.display = 'block';
										}
									}
								}
								onMouseLeave={
									() => {
										if (document.getElementById("item" + index)) {
											document.getElementById("item" + index)!.style.display = 'none';
										}
									}
								}
								key={`${item.product_ext_id}&${item.product_name}^${index}`} value={item.product_ext_id}>{
									item.product_name.length > SymbolsLimit ? item.product_name.substring(0, SymbolsLimit) + "..." : item.product_name
								}
								<ItemHint id={"item" + index} text={item.product_name}
								/>
							</MenuItem>;
						})}
				</Select>
				<Button onClick={onDeleteProduct} style={{ padding: "0", minWidth: "3rem" }} >
					{product.is_deleted ? <img src={AddIcon} alt="add" /> : <DeleteIcon />}
				</Button>
			</Box>

		</Box>
	);

};
