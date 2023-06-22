export type UploadMenuFormType = {
  file: string | null,
  menuName: string,
  menuType: string | null
};

export interface UploadMenuPageLayoutProps {
  state: any
  step: number
  validated: number
  setStep: (value: number) => void
  uploadedMenu: any[]
  uploadMenuLoader: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<any>
  onSubmit: (e: React.SyntheticEvent) => void
}

export interface Step1Props {
  step: number,
  state: UploadMenuFormType,
  uploadedMenu: any,
  uploadMenuLoader: boolean,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<any>
}

export interface Step2Props {
  step: number,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<any>,
  state: UploadMenuFormType
}

export interface Step3Props {
  step: number
  state: UploadMenuFormType
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<any>
}