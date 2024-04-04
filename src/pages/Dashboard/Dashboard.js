import Cards from '../../components/Cards'
import ChartOne from '../../components/ChartOne';
import ChartTwo from '../../components/ChartTwo'

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-row ">
        <Cards />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        {/* <ChartTwo /> */}
      </div>
    </>
  );
};

export default Dashboard;
