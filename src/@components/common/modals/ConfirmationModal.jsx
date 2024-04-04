import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React from 'react'

const ConfirmationModal = ({ open, onConfirm, onCancel, header = "Are you sure ?", body = "This action can't be undone, are you sure to do this ?" }) => {
    return (
        <Dialog
            animate={{
                mount: { scale: 1, x: 0, y: 0 },
                unmount: { scale: 0, x: 0, y: -800 }
            }}
            open={open}
            handler={onCancel}>
            <DialogHeader>{header}</DialogHeader>
            <DialogBody>{body}</DialogBody>
            <DialogFooter>
                <Button variant='text' color='red' onClick={onCancel}>Cancle</Button>
                <Button variant='text' color='green' onClick={onConfirm}>Confirm</Button>
            </DialogFooter>
        </Dialog>
    )
}

export default ConfirmationModal