import { Icon } from "@iconify/react/dist/iconify.js";

export const SortIcon = ({ sort }) => {
  return (
    <>
      <div className="flex flex-col text-xs text-zinc-600 ">
        {sort == "asc" ? (
          <Icon icon={"bxs:up-arrow"} />
        ) : (
          <Icon icon={"bx:up-arrow"} />
        )}
        {sort == "desc" ? (
          <Icon icon={"bxs:down-arrow"} />
        ) : (
          <Icon icon={"bx:down-arrow"} />
        )}
      </div>
    </>
  );
};
