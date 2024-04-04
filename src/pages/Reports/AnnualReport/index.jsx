import React, { useEffect, useState } from 'react';
import PartA from './PartA';
import PartD from './PartD';
import PartC from './PartC';
import PartB from './PartB';
import Breadcrumb from '../../../components/Breadcrumb';


const AnnualReport = () => {



    return (
        <>
            <Breadcrumb pageName="Annual Report" />

            <div className='py-5'>
                <PartA
                    header="Part-1 (Summary of Information)"
                />
            </div>

            <div className='pb-5'>
                <PartB
                    header="Part 2: District-wise Bio-medical Waste Generation (for the previous calender year XXXX)"
                />
            </div>


            <div className='pb-5'>
                <PartC
                    header="Part 3: Information on Health Care Facilities having Capitive Treatment Facilities (for the previous year XXXX)"
                />
            </div>


            <div className='pb-5'>
                <PartD
                    header="Part 4: Information on Common Bio-Medical Waste Treatment and Disposal Facilities (for the previous year XXXX)"
                />
            </div>
        </>
    );
};

export default AnnualReport;
