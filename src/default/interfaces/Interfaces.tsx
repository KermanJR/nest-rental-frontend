
export interface ClientsProps{

}

export interface ModalProps{
    data: any;
    openModal: Boolean;
    setModal: React.Dispatch<React.SetStateAction<Boolean>>
}

export interface ModalPropsTestEdit{
    openModal: Boolean;
    setModal: React.Dispatch<React.SetStateAction<Boolean>>;
    data: {};
    edit: Boolean;
}
  
