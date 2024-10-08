/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import { Modal, Box } from "@mui/material"

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: any;
    component: any;
    setRoute?: (Route: string) => void;
}

const CustomModel: FC<Props> = ({ open, setOpen, setRoute, component: Component }) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="model-model-title"
            aria-describedby="model-model-description">
            <Box
                className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none "
            >
                <Component setOpen={setOpen} setRoute={setRoute} />
            </Box>
        </Modal>
    )
}

export default CustomModel