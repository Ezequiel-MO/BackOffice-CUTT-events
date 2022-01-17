import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { selectTransferCounter } from "../../features/TransfersSlice";

const TransferCounter = ({ increase }) => {
  const counter = useSelector(selectTransferCounter);
  return (
    <div>
      <button type='button' onClick={() => increase(-1)}>
        <Icon icon='akar-icons:minus' color='rgba(238, 170, 85, 0.6)' />
      </button>
      {counter}
      <button type='button' onClick={() => increase(1)}>
        <Icon icon='akar-icons:plus' color='rgba(238, 170, 85, 0.6)' />
      </button>
    </div>
  );
};

export default TransferCounter;
