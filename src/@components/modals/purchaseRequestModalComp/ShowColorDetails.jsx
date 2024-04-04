import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React from 'react'
import { getColorById, getColorNameByCode, getTextColorById } from '../../../config'

function ShowColorDetails({ open, handleOpen, data }) {
    return (
        <Dialog
            size='xs'
            open={open} handler={handleOpen}>
            <DialogHeader>
                Individual Colors
            </DialogHeader>
            <DialogBody className='w-full flex-col'>
                {
                    open && data?.all_color_ids?.map((d, i) => (
                        <div className={`w-full border rounded flex justify-between items-center shadow my-2 px-4 py-1 font-bold ${getTextColorById(d)} ${getColorById(d)}`}>
                            <span>{getColorNameByCode(d)}</span>
                            <span>{data?.all_bag_qty[i]}</span>
                        </div>
                    ))
                }
            </DialogBody>

            <DialogFooter>
                <Button onClick={handleOpen} variant='text' color='blue'>OK</Button>
            </DialogFooter>
        </Dialog>
    )
}

export default ShowColorDetails