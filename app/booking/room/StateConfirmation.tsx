import React, { useState, useEffect, Dispatch, SetStateAction, FC} from 'react';

interface StateConfirmationProps {
  booking_id: number;
  
}

export const StateConfirmation: FC<StateConfirmationProps> = ({
  booking_id,
}) => {
  return(
    <>
    {booking_id}
    </>
  )
}

