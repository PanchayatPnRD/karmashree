import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import EachColorFields from './purchaseRequestModalComp/EachColorFields'
import { useBagPurchaseApi } from '../../rdxsga/hooks/actions/bagPurchase/bagPurchaseApiHook'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { purchaseListSelector } from '../../rdxsga/redux/slices/bagPurchaseSlice'
import { getColorNameByCode } from '../../config'


const EditPurchaseModal = ({ open, confirmAction, cancelAction, data }) => {
    const bagPurchaseApi = useBagPurchaseApi();
    const [partiallyAccepted, setPartiallyAccepted] = useState(null)
    const [isPartial, setIsPartial] = useState(false);
    const [isZero, setIsZero] = useState(true);

    const resetModalState = () => {
        // setIsPartial(false);
        setIsZero(true);
        cancelAction();
    }

    const getBgClass = id => {
        switch (id) {
            case 1:
                return "bg-[#FFFF34] text-black"
            case 2:
                return "bg-[#0000FF] text-white"
            case 3:
                return "bg-[#FF0000] text-white"
            case 4:
                return "bg-whiten text-black"
            case 5:
                return "bg-[#008080] text-white"
        }
    }


    const acceptRequest = () => {

        let parcheseItemDto = [];
        partiallyAccepted?.purchasesWithDifference?.map(d => {
            parcheseItemDto.push({
                color_id: d?.color_id,
                hospital_id: d?.hospital_id,
                bag_qty: d?.bag_qty,
            })
        })

        bagPurchaseApi.callAcceptPartiallyAcceptedData({
            parcheseItemDto,
            batch: data?.purchaseRepository_batchno,
            reqBatch: partiallyAccepted?.recivedbatch[0]?.reqbatchno,
        }, (message, resp) => {
            console.log(message, resp);
            cancelAction()
            toast.success(message);
        }, (message, resp) => {
            console.error(message, resp);
            toast.error(message);
        })
    }


    const rejectPartialRequest = () => {
        let parcheseItemDto = [];
        partiallyAccepted?.purchasesWithDifference?.map(d => {
            parcheseItemDto.push({
                color_id: d?.color_id,
                hospital_id: d?.hospital_id,
                bag_qty: d?.bag_qty,
                recive_bag_qty: d?.recive_bag_qty,
                approve_status: false,
                recived_status: false,
            })
        })


        bagPurchaseApi.callRejectPartiallyAcceptedData({
            batch: data?.purchaseRepository_batchno,
            reqBatch: partiallyAccepted?.recivedbatch[0]?.reqbatchno,
            parcheseItemDto
        }, (message, resp) => {
            console.log(message, resp);
            cancelAction();
            toast.success(message);
        }, (message, resp) => {
            console.error(message, resp);
            toast.error(message);
        })
    }


    useEffect(() => {
        open && bagPurchaseApi.callGetApprovedData({ batch: data?.purchaseRepository_batchno }, (message, resp) => {
            toast.success(message);
            setPartiallyAccepted(resp);
        }, (message, resp) => {
            toast.error(message)
        })
    }, [open])


    // useEffect(() => {
    //     let checkIfIsPartial = false;
    //     partiallyAccepted && partiallyAccepted?.length > 0 && partiallyAccepted?.purchasesWithDifference && partiallyAccepted?.purchasesWithDifference?.map(d => {
    //         checkIfIsPartial = checkIfIsPartial || d?.totalReciveBagQty > 0;
    //     })
    //     setIsPartial(checkIfIsPartial)
    // }, [partiallyAccepted, open])


    useEffect(() => {
        let checkIfZero = true;
        open && partiallyAccepted && partiallyAccepted?.purchasesWithDifference && partiallyAccepted?.purchasesWithDifference?.map((d, i) => {
            checkIfZero = checkIfZero && d?.recive_bag_qty == 0;
            console.log({ checkIfZero, qty: d?.recive_bag_qty })
        })

        setIsZero(checkIfZero)
    }, [partiallyAccepted, open])


    useEffect(() => {
        console.log({ partiallyAccepted })

    }, [partiallyAccepted])


    console.log({ isZero });
    return (
        <Dialog
            open={open}
            handler={resetModalState}
            animate={{
                mount: { scale: 1, x: 0, y: 0 },
                unmount: { scale: 0, x: 1000, y: 200 }
            }}
            className='p-5 bg-white dark:bg-boxdark'>
            <DialogHeader className='text-black dark:text-white'>Received Status</DialogHeader>

            <DialogBody>
                <div className="rounded-sm bg-white  dark:border-strokedark dark:bg-boxdark">
                    <div className="px-5 w-full flex-col justify-center items-center">
                        <div className="w-full grid grid-cols-4">
                            <span></span>
                            <span></span>
                            <span className='text-black dark:text-white'>Total</span>
                            <span className='text-black dark:text-white'>Requested</span>
                        </div>
                        {
                            partiallyAccepted && partiallyAccepted?.purchasesWithDifference && partiallyAccepted?.purchasesWithDifference?.map((d, i) => {

                                return <EachColorFields
                                    key={i}
                                    chipClass={` ${getBgClass(d?.color_id)} border`}
                                    label={getColorNameByCode(d?.color_id)}
                                    total={d?.bag_qty}
                                    // given={d?.bag_qty - d?.recive_bag_qty}
                                    requested={d?.recive_bag_qty} />

                            })
                        }
                    </div>
                </div>
            </DialogBody>
            <DialogFooter>
                <Button variant='text' color='amber' onClick={resetModalState}>Cancel</Button>
                {
                    !isZero && (
                        <>
                            <Button
                                variant='text' color='red' onClick={rejectPartialRequest}>Reject</Button>
                            <Button variant='text' color='green' onClick={acceptRequest}>Accept</Button>
                        </>
                    )
                }
            </DialogFooter>
        </Dialog>
    )
}

export default EditPurchaseModal








// <EachColorFields chipClass={"bg-[#FFFF34] text-black border"} label={"Yellow"} value={data?.all_bag_qty[data?.all_color_ids?.findIndex(d => d == 1)]} />
//                         <EachColorFields chipClass={"bg-[#0000FF] text-white border"} label={"Blue"} value={data?.all_bag_qty[data?.all_color_ids?.findIndex(d => d == 2)]} />
//                         <EachColorFields chipClass={"bg-[#FF0000] text-white border"} label={"Red"} value={data?.all_bag_qty[data?.all_color_ids?.findIndex(d => d == 3)]} />
//                         <EachColorFields chipClass={"bg-whiten text-black shadow border"} label={"White"} value={data?.all_bag_qty[data?.all_color_ids?.findIndex(d => d == 4)]} />
//                         <EachColorFields chipClass={"bg-[#008080] text-white border"} label={"Cytotoxic"} value={data?.all_bag_qty[data?.all_color_ids?.findIndex(d => d == 5)]} />