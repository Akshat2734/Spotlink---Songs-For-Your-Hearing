import React from 'react';

const Feature = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <dt className="text-gray-400">{label}</dt>
    <dd className="text-gray-200 font-medium">{value}</dd>
  </div>
);

export default Feature;
