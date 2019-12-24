import React from 'react';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';

const query = {
  xs: {
    maxWidth: 575,
  },
  sm: {
    minWidth: 576,
    maxWidth: 767,
  },
  md: {
    minWidth: 768,
    maxWidth: 991,
  },
  lg: {
    minWidth: 992,
    maxWidth: 1199,
  },
  xl: {
    minWidth: 1200,
    maxWidth: 1599,
  },
  xxl: {
    minWidth: 1600,
  },
};

const defaultWidthMap = {
  xs: 500,
  sm: 550,
  md: 650,
  lg: 850,
  xl: 900,
  xxl: 1200,
};

export interface IWidthMap {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

export interface IDynamicContainerProps {
  widthMap?: IWidthMap;
  children: (number) => any;
}

export default function DynamicContainer(props: IDynamicContainerProps) {
  const { children, widthMap = defaultWidthMap } = props;
  return (
    <ContainerQuery query={query}>
      {params => children(widthMap[classNames(params)])}
    </ContainerQuery>
  );
}
