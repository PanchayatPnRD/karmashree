import { Accordion, AccordionBody, AccordionHeader, Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useHcfApi } from '../../../rdxsga/hooks/actions/hcf/useHcfApiHook'
import { toast } from 'react-toastify'
import { RiArrowDropDownFill, RiPictureInPictureLine } from 'react-icons/ri'
import { getAbsoluteImagePath, getColorById, getColorNameByCode, getTextColorById } from '../../../config'
import moment from 'moment'

const ViewSignModal = ({ open, resetModalState, data }) => {
    const hcfApi = useHcfApi()

    const [details, setDetails] = useState(null);
    const [accordionOpen, setAccordionOpen] = useState(null);

    useEffect(() => {
        open && hcfApi.callFetchHandoverDetails({ hospitalId: data?.handover_hospital_id, colorId: data?.handover_color_id, date: data?.date }, (message, resp) => {
            setDetails(resp);
        }, (message, resp) => {
            toast.error(message)
        })
    }, [open])


    return (
        <Dialog
            open={open}
            handler={resetModalState}
            // animate={{
            //     mount: { scale: 1, x: 0, y: 0 },
            //     unmount: { scale: 0, x: 1000, y: 200 }
            // }}
            className='bg-whiten dark:bg-boxdark'>
            <DialogBody className='px-5 w-full flex-col max-h-[80vh]  overflow-y-auto'>
                <div className='text-black dark:text-white flex justify-between items-center'>
                    <span className='font-extrabold text-2xl'>View Signatures</span>
                    {/* <span className={`px-3 rounded font-bold ${getColorById(data?.handover_color_id)} ${getTextColorById(data?.handover_color_id)}`}>total : 30</span> */}
                </div>
                <div className={`w-full rounded ${getColorById(data?.handover_color_id)} ${getTextColorById(data?.handover_color_id)} text-center font-bold items-center gap-4 my-4 shadow px-2 ps-5 py-3`}>
                    {getColorNameByCode(data?.handover_color_id)}
                </div>
                <div className='w-full rounded bg-white dark:bg-black grid grid-cols-3 items-center gap-4 my-4 shadow px-2 ps-5 py-3'>
                    <div >
                    </div>
                    <div className='text-black dark:text-white'>Quantity</div>
                    <div className='text-black dark:text-white'>Weight</div>

                    <div className='text-xl font-bold text-black dark:text-white'>Pending</div>
                    <div className='font-bold text-lg'>{details?.pendingQuantity?.quantity} Pkts.</div>
                    <div className='font-bold text-lg'>{details?.pendingQuantity?.weight} Kgs.</div>
                </div>

                {
                    details?.doneQuantity?.length > 0 ? details?.doneQuantity?.map((d, i) => {

                        return (
                            <div className='w-full flex-col rounded bg-white dark:bg-black my-1 shadow px-2 ps-5 py-3 my-4'>
                                <div className="w-full text-center">
                                    {d?.pickup_time ? moment(d?.pickup_time).format("Do MMM, YYYY - hh:mm a") : "NA"}
                                </div>
                                <div className='w-full bg-white dark:bg-black grid grid-cols-3 items-center gap-4 my-1'>
                                    <div></div>
                                    <div className='text-black dark:text-white'>Quantity</div>
                                    <div className='text-black dark:text-white'>Weight</div>

                                    <div className='text-xl font-bold text-black dark:text-white'>Completed</div>
                                    <div className='font-bold text-lg'>{d?.quantity} Pkts.</div>
                                    <div className='font-bold text-lg'>{d?.weight} Kgs.</div>
                                </div>
                                <Accordion open={accordionOpen == i} icon={accordionOpen !== i ? <RiArrowDropDownFill className='text-4xl' /> :
                                    <RiArrowDropDownFill className='rotate-180 duration-300 text-4xl' />}>
                                    <AccordionHeader onClick={() => accordionOpen == i ? setAccordionOpen(null) : setAccordionOpen(i)}>
                                        Signatures
                                    </AccordionHeader>
                                    <AccordionBody>
                                        <div className="w-full grid grid-cols-2 mt-4">
                                            <div className=' border flex rounded items-center justify-center me-4'>
                                                <img
                                                    className='w-[250px] h-[150px]'
                                                    src={getAbsoluteImagePath(d?.btfsign)}
                                                    alt={d?.quantity} />
                                            </div>
                                            <div className='border flex rounded items-center justify-center ms-4'>
                                                <img
                                                    className='w-[250px] h-[150px]'
                                                    src={getAbsoluteImagePath(d?.hcfsign)}
                                                    alt={d?.quantity} />
                                            </div>
                                            <div className="w-full text-center">
                                                BTF Sign
                                            </div>
                                            <div className="w-full text-center">
                                                HCF Sign
                                            </div>
                                        </div>
                                    </AccordionBody>
                                </Accordion>
                            </div>
                        )
                    }) : <div className='w-full flex-col rounded bg-white dark:bg-black my-1 shadow px-2 ps-5 py-3 my-4'>
                        <div className='w-full bg-white dark:bg-black text-black dark:text-white text-center'>
                            <div >Nothing Completed</div>
                        </div>
                    </div>
                }
            </DialogBody>
            <DialogFooter>
                <Button className='mx-2 text-lg font-bold' size='sm' onClick={resetModalState} variant='text' >
                    Ok
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default ViewSignModal