import React from "react";

import { Controller, useForm } from "react-hook-form";
import { Box, Checkbox, Chip, FormControlLabel, ListSubheader, MenuItem, SelectChangeEvent, TextField, Typography, Switch } from "@mui/material";

import { Button, Input, Textarea, Select, Modal } from "@src/components";
import { ToolTip } from "@src/components/ToolTip/ToolTip";
import { attributeTooltip, defaultValues } from "../generator";
import PlusIcon from '@src/assets/icons/plus.png';
import ToolTipIcon from '@src/assets/icons/tooltipGreen.png';
import { EditProductFormProps, FORM_MODE, IPosProductSelect } from "./types";
import { roles } from "@src/shared/roles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNewProduct, setOldProduct } from "@src/store/selectAll/types/actionCreators";


export const EditProductForm: React.FC<EditProductFormProps> = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { attributes, product, formMode, pos_products, sections_product, editUrl, default_attributes, pos_attributes, onSubmit, setModalOpen, handleCloseDrawer } = props;

	const { reset, control, handleSubmit, getValues } = useForm({ defaultValues: { ...defaultValues } });

	const [isAlcohol, setIsAlcohol] = React.useState(false);
	const [showHiddenAttributes, setShowHiddenAttributes] = React.useState(true);
	const [attributeGroupState, setAttributeGroupState] = React.useState<any[]>([]);
	const [defaultAttributesState, setDefaultAttributesState] = React.useState<any[]>([]);

	const [image, setImage] = React.useState<string>("");
	const [aggregatorModal, setAggregatorModal] = React.useState(false);
	const [aggregator, setAggregator] = React.useState(false);

	const handleAlcoholProduct = (): void => setIsAlcohol(!isAlcohol);
	const handleHiddenAttributes = (): void => setShowHiddenAttributes(!showHiddenAttributes);


	const handleAttributeOpen = (): void => setModalOpen(true);


	const handleDeleteAttributeGroup = (attribute: any): void => {
		setAttributeGroupState(attributeGroupState.filter((item: any) => item.ExtID !== attribute.ExtID));
	};
	const handleDefaultAttributeChange = (e: SelectChangeEvent<any>): void => {
		const val = e.target.value;
		const new_attribute = { ext_id: val.ext_id, name: val.name, by_admin: true };
		const isExist = defaultAttributesState.some(attribute => attribute.ext_id === new_attribute.ext_id);
		if (!isExist) {
			setDefaultAttributesState([
				...defaultAttributesState,
				new_attribute
			]);
		}
	};
	const handleDeleteDefault = (id: string): void => {
		setDefaultAttributesState(defaultAttributesState.filter(item => item.ext_id !== id));
	};

	const handleCloseAggregatorModal = (): void => setAggregatorModal(false);

	const handleOpenAggregatorModal = (): void => setAggregatorModal(true);

	const handleChangeAggregator = (e: React.ChangeEvent<HTMLInputElement>): void => setAggregator(e.target.checked);

	const handleClickSelectAll = (): void => {
		dispatch(setOldProduct(product));
		dispatch(setNewProduct({ ...getValues(), attributeGroupState }));
		navigate("select-all");
	};

	const handleSubmitForm = (data: any): void => {
		const payload = {
			product: {
				...data,
				default_attributes_objects: defaultAttributesState,
				attribute_groups: attributeGroupState.map((el: any) => el.ExtID),
			},
			is_update_in_aggregator: aggregator,
			attribute_groups: attributeGroupState,
			default_attributes: defaultAttributesState,
			locations: null,
			alcohol: isAlcohol
		};
		onSubmit(payload);
	};

	React.useEffect(() => {
		if (!image) {
			setImage(product.images);
		}
	}, [product]);
	React.useEffect(() => {
		// reset
		reset({
			...product,
			images: (!product.images || !product.images[0]) ? ["https://via.placeholder.com/150x150"] : product.images
		});
		setAttributeGroupState(attributes);
		setShowHiddenAttributes(true);
		setDefaultAttributesState(default_attributes ?? []);
	}, [product]);

	return (
		<form style={{ position: "relative" }}>
			<Box mt='1rem'>
				<Controller
					name="images"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<Input

							fullWidth
							onChange={e => field.onChange([e.target.value])}
							value={field.value ? field.value[0] : ""}
							label='Ссылка на изображение' />
					)}
				/>
			</Box>

			{/* CHANGE PRODUCT ID  */}
			<Box display="flex" marginTop='15px' width={'50%'}>
				<PosProductSelect productId={product.id} pos_products={pos_products} control={control} />
				<Controller
					name="section"
					control={control}
					render={({ field }) => (
						<Select  {...field} label="Категория Товара" fullWidth>
							{sections_product.map((item: any) => (
								<MenuItem value={item.id} key={`${item.id}!${item.name}`}>{item.name}</MenuItem>
							))}
						</Select>
					)}
				/>
			</Box>

			<Box mt='15px'>
				<Box display='flex' mb='15px'>
					<Controller
						name="name"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<Input
								fullWidth
								onChange={(e) => {
									field.onChange(
										[{
											Value: e.target.value,
											LanguageCode: "ru"
										}]);
								}
								}
								value={field.value ? field.value[0].Value : ""}
								label='Название позиции в агрегаторе' />
						)}
					/>
					<Box mr='15px' />
					<Controller
						name="price"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<Input
								// disabled={true}
								sx={{ '& .MuiOutlinedInput-input': { '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': { '-webkit-appearance': 'none' } } }}
								type="number"
								onChange={
									(e) => field.onChange([{
										Value: Number(e.target.value),
										CurrencyCode: field.value[0]?.CurrencyCode ? field.value[0]?.CurrencyCode : ""
									}])
								}
								label='Цена за единицу'
								value={field.value ? field.value[0].Value : 0}
							/>
						)}
					/>
				</Box>

				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<Textarea
							fullWidth
							label='Описание'
							helper='0/ 200 символов'
							value={field.value ? field.value[0].Value : ''}
							onChange={e => field.onChange([{
								Value: e.target.value,
								LanguageCode: "ru"
							}])}
						/>
					)}
				/>

				{formMode === FORM_MODE.EDIT
				? <Box display="flex" alignItems="center" mb="10px">
					<FormControlLabel
						control={<Checkbox checked={Boolean(product.alcohol)} onChange={handleAlcoholProduct} />}
						label={
							<Typography fontSize="18px" fontWeight="600">
								Алкогольная продукция
							</Typography>
						} 
					/>
				  </Box>
				: <Box display="flex" alignItems="center" mb="10px">
					<FormControlLabel
						control={<Checkbox checked={isAlcohol} onChange={handleAlcoholProduct} />}
						label={
							<Typography fontSize="18px" fontWeight="600">
								Алкогольная продукция
							</Typography>
						} 
					/>
				  </Box>
				}

			</Box>
			
			{/* ATTRIBUTE GROUPS  */}
			<Box display="flex" flexWrap="wrap" mt="20px" >
				{attributeGroupState.map((attribute: any, index: number) => (
					<React.Fragment key={`${attribute.ExtID}%${index}`}>
						<Box maxWidth="300px" width="48%" mb="10px" mr="60px" >
							<Select
								label="Атрибуты"
								edit={`${editUrl}${attribute.ExtID}`}
								value={attribute.Name}
								onDelete={() => handleDeleteAttributeGroup(attribute)}
								fullWidth>
								<MenuItem value={attribute.Name}>{attribute.Name}</MenuItem>
							</Select>

							{attribute.Attributes ? attribute.Attributes.map((atr_name: any, index: number) => (
								<Chip sx={{ margin: "5px 0" }} key={`${atr_name.Article}${index}`} label={atr_name.name} />
							))
								: null}
						</Box>

					</React.Fragment>
				))}
			</Box>
			{formMode === FORM_MODE.EDIT ?
				<Box m="20px 0">
					<Button buttonSize='s' onClick={handleAttributeOpen} variant='contained' color='inherit'>
						<img src={PlusIcon} style={{ marginRight: ".8em" }} alt="" />
						Добавить группу атрибутов
					</Button>
				</Box>
				: null
			}
			<Box borderTop="1px solid #C4C3C5" p="25px 0">
				<Button variant="contained" color="success" onClick={handleClickSelectAll}>

					Применить эти изменения на другие точки

				</Button>
			</Box>

			{/* DEFAULT ATTRIBUTES */}
			{formMode === FORM_MODE.EDIT ?
				<Box >
					<Box display="flex" alignItems="center" mb="10px">
						<FormControlLabel
							control={<Checkbox checked={showHiddenAttributes} onChange={handleHiddenAttributes} />}
							label={
								<Typography fontSize="18px" fontWeight="600">
									Хочу добавить скрытые аттрибуты
								</Typography>
							} />
						<ToolTip arrow placement="top" textColor="#025F3E" title={attributeTooltip}>
							<img src={ToolTipIcon} />
						</ToolTip>
					</Box>
					<Box mb="10px">
						{/* DEFAULTS  */}
						{defaultAttributesState.map((def_attr, index) => (
							<Chip
								key={`${def_attr.ext_id}#${index}`}
								label={def_attr.name}
								disabled={!def_attr.by_admin}
								onDelete={() => handleDeleteDefault(def_attr.ext_id)}
								sx={{ marginBottom: "3px" }}
							/>
						))}
					</Box>
					<Box>
						<Select value={0} onChange={handleDefaultAttributeChange}>
							<MenuItem value={0}>Название скрытого аттрибута</MenuItem>
							{pos_attributes?.map(item => (
								<MenuItem key={item.ext_id} value={item}>{item.name}</MenuItem>
							))}
						</Select>
					</Box>
				</Box>
				: null}
			<Box>


			</Box>
			<br />
			{/* {formMode === FORM_MODE.EDIT ? <React.Fragment>
				<Typography fontSize="18px" fontWeight="600" mb="1rem">
					Применить изменение позиции на следующих точках:
				</Typography>
				<FormGroup>
					{locations && <FormControlLabel
						style={{ marginBottom: ".5rem" }}
						control={
							<Checkbox checked={locations.length == checkedLocations.length} onChange={handleLocationsChange} value="all" />
						}
						label={
							<Typography fontSize="18px" fontWeight="600" ml="1rem">
								Select all
							</Typography>
						} />}
					{(locations) && locations.map((el, index) => (<div key={el.menu_name} style={{ width: "80%" }}>
						<FormControlLabel key={'a' + el.address}
							style={{ width: "100%" }}
							control={
								<Checkbox checked={checkedLocations.includes(locations[index])} onChange={handleLocationsChange} value={index} />
							}
							label={<div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", minWidth: "600px" }}>
								<Typography fontSize="18px" ml={"1rem"}>
									{el.address}
								</Typography>
								<Typography fontSize="18px" style={{ verticalAlign: "bottom" }}>
									{el.delivery.charAt(0).toUpperCase() + el.delivery.slice(1)} меню
								</Typography>
							</div>
							} />

					</div>
					))}
				</FormGroup>
			</React.Fragment> : null} */}

			<Box height="100px" width="100%" />
			<Box position="absolute" bottom="20px" right="20px">
				<Button buttonSize="m" onClick={handleCloseDrawer}>
					Отменить
				</Button>
				<Button onClick={formMode === FORM_MODE.EDIT ? handleOpenAggregatorModal : handleSubmit(handleSubmitForm)} variant="contained" buttonSize="m">
					{formMode === FORM_MODE.EDIT ? "Сохранить" : "Добавить"}
				</Button>
			</Box>

			{formMode === FORM_MODE.EDIT
				?
				<Modal open={aggregatorModal} handleClose={handleCloseAggregatorModal}>
					<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" p="20px">
						<Box display="flex" >
							<Switch checked={aggregator} onChange={handleChangeAggregator} />
							<Typography>Добавить эти изменения в агрегаторе?</Typography>
						</Box>

						<Box mt="60px">
							<Button color="onyx" onClick={handleSubmit(handleSubmitForm)}>Отмена</Button>
							<Button color="success" variant="contained" onClick={handleSubmit(handleSubmitForm)}>Подтвердить</Button>
						</Box>
					</Box>
				</Modal>
				: null}

		</form>
	);
};


const PosProductSelect: React.FC<IPosProductSelect> = ({ pos_products, control, productId }) => {
	const [search_pos, setSearchPos] = React.useState("");

	const handleSearchPos = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchPos(e.target.value);
	};

	const filterdPosProducts = React.useMemo(() => {
		if (pos_products) {
			return pos_products.filter((item: any) => item.product_name.toLowerCase().indexOf(search_pos.toLowerCase()) !== -1);
		}
		return null;
	}, [search_pos, productId]);
	const hasPermission = (roleList: string[]) => {
		const userRoles = JSON.parse(localStorage.getItem("userRole") || '[]') || "";
		if (!userRoles) {
			return false;
		}
		return userRoles.some((i: any) => roleList.includes(i));
	};
	return (
		<React.Fragment>
			{filterdPosProducts ?
				(hasPermission(roles.menu_advanced) && <Controller
					name="id"
					control={control}
					render={({ field }) => (
						<Select {...field} label="ID товара в POS" fullWidth MenuProps={{ autoFocus: false }}>
							<ListSubheader sx={{ margin: "5px 0" }}>
								<TextField
									autoFocus
									value={search_pos}
									onKeyDown={(e) => {
										if (e.key !== "Escape") {
											e.stopPropagation();
										}
									}}
									onChange={handleSearchPos} size="small" fullWidth placeholder="Search" />
							</ListSubheader>
							{filterdPosProducts.map((item: any, index: number) => (
								<MenuItem value={item.product_id}
									key={`${item.product_name}@${item.product_id}`}>{item.product_name}</MenuItem>
							))}
						</Select>
					)}
				/>) : null
			}
			{filterdPosProducts ? <Box width="20px" /> : null}
		</React.Fragment>
	);
};
