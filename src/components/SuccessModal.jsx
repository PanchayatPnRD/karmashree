import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Modal } from "flowbite-react";

const SuccessModal = ({
  createdReq,
  resetData,
  to,
  toverify,
  userCreate,
  setOpenModal,
  openModal,
  isSuccess,
  errorMsg,
  message,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body className="px-0 pt-0">
          <h1
            className={classNames(
              "text-center py-6 text-2xl text-white font-semibold border-b-2 rounded-t-lg",
              isSuccess ? "bg-green-400" : "bg-red-400"
            )}
          >
            {isSuccess ? "Success" : "Error"}
          </h1>
          <div className="space-y-6 px-12 p-6">
            {isSuccess ? (
              userCreate ? (
                <>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    You have successfully been registered in Karmashree portal,
                    your user id is <b className="text-zinc-700">{message}</b>{" "}
                    and details have been sent to your registered mobile number.
                    Please change your password in first login
                  </p>
                </>
              ) : createdReq ? (
                <>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      Work Requisition ID <span className="font-bold text-zinc-800">{createdReq}</span>{" "}successfully
                    created
                  </p>
                </>
              ) : (
                <>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {message}
                  </p>
                </>
              )
            ) : (
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {errorMsg}
              </p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center items-center">
          <button
            className="relative animate-pulse2 bg-blue-600 p-2 px-6 rounded-lg text-white font-semibold hover:shadow-md transition-all"
            onClick={() => {
              setOpenModal((prev) => !prev);
              if (isSuccess && userCreate)
                navigate("/dashboard/dept-userlist", { state: "dept-user" });
              if (isSuccess && to) navigate("/dashboard/" + to);
              if (isSuccess && toverify) navigate("/"+toverify);
              if (resetData) resetData();
            }}
          >
            {/* <div className="absolute -top-2 -right-2 size-5 rounded-full bg-red-600 animate-ping"></div>
            <div className="absolute -top-1 -right-1 size-3 rounded-full bg-red-600"></div>
            <span>Okay</span> */}
            Okay
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SuccessModal;
