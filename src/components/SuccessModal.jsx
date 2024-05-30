import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Modal } from "flowbite-react";

const SuccessModal = ({
  resetData,
  to,
  toverify,
  setOpenModal,
  openModal,
  isSuccess,
  error,
  message,
}) => {
  const navigate = useNavigate();
  const idRegex = /\b[-\w&/_]*\d[-\w&/_]*\b/;
  const parts = message?.split(idRegex);
  const id = message?.match(idRegex);
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
            {isSuccess ? "Success" : error ?? "Error"}
          </h1>
          <div className="space-y-6 px-12 p-6">
            {isSuccess && message !== undefined ? (
              <>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {parts[0]}
                  <span className="font-bold text-zinc-700">{id}</span>
                  {parts[1]}
                </p>
              </>
            ) : (
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {message}
              </p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center items-center">
          <button
            className="relative animate-pulse2 bg-blue-600 p-2 px-6 rounded-lg text-white font-semibold hover:shadow-md transition-all"
            onClick={() => {
              setOpenModal((prev) => !prev);

              if (isSuccess && to) navigate("/dashboard/" + to);
              if (isSuccess && toverify)
                navigate("/" + toverify, { state: "reset" });
              if (resetData) resetData();
            }}
          >
            Okay
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SuccessModal;
