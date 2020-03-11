import React from 'react';
import { useParams } from 'react-router';

export default function ListOfFindings() {
  let { id } = useParams();
  return (
    <div>
      List Of Findings
    </div>
  )
}