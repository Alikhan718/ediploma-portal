import { Box, Drawer } from '@mui/material';
import { selectCurrentLocation } from '@src/store/locations/selector';
import { fetchStopListAggregators } from '@src/store/stoplist/reducer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { DisableProduct } from './drawers/DisableProduct';
import { EnableProduct } from './drawers/EnableProduct';
import { stoplistDrawerRoutes } from './routes/routes';
import { StopListPageLayout } from './StopListPage.Layout';

const StopListPageContainer: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams();
	const dispatch = useDispatch();
	const currLocation = useSelector(selectCurrentLocation);

	const [open, setOpen] = React.useState(false);

	const handleCloseDrawer = (): void => {
		setOpen(false);
		navigate('/app/stopList');
	};
	const handleOpenDrawer = (): void => setOpen(true);

	React.useEffect(() => {
		dispatch(fetchStopListAggregators());
	}, [currLocation]);
	React.useEffect(() => {
		const params_arr = params["*"]?.split("/");
		if (params_arr && (params_arr[0] === 'disable-product' || params_arr[0] === 'enable-product')) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [params]);
	return (
		<React.Fragment>
			<StopListPageLayout handleOpenDrawer={handleOpenDrawer} />
			<Drawer variant="temporary" anchor="right" open={open} onClose={handleCloseDrawer} >
				<Box p="40px" width="800px" height="100%" position="relative">
					<Routes>
						<Route path={stoplistDrawerRoutes.disableProduct} element={<DisableProduct />} />
						<Route path={stoplistDrawerRoutes.enableProduct} element={<EnableProduct />} />
					</Routes>
				</Box>
			</Drawer>
		</React.Fragment>
	);
};

export default StopListPageContainer;