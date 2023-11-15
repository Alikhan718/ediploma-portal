import {RootState} from "../store";

export const selectArchiveLink = (state: RootState) => state.generator.archive_link;
export const selectIsUploaded = (state: RootState) => state.generator.is_uploaded;


