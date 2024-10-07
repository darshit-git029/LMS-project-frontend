import { Route } from 'next'
import React, { FC } from 'react'
import { Modal,Box }    from "@mui/material"
import { FaSlack } from 'react-icons/fa';
type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: any;
    component: any;
    setRoute?: (Route: string) => void;
}

const CustomModel: FC<Props> = ({ open, setOpen, setRoute, component: { Component } }) => {
    return (
        <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby = "model-model-title"
        aria-describedby = "model-model-description">
        <Box>
            
        </Box>
        </Modal>
    )
}

export default CustomModel