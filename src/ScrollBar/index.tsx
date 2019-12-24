/* https://github.com/malte-wessel/react-custom-scrollbars  */
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';

interface IScrollFrameProps {
  top: number;
  left: number;
  clientWidth: number;
  clientHeight: number;
  scrollWidth: number;
  scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
}

interface IScrollBarProps {
  /**
   * 滚动的时候触发
   */
  onScroll?: (e: Event) => void;
  /**
   * 动画内滚动
   */
  onScrollFrame?: (values: IScrollFrameProps) => void;
  onScrollStart?: () => void;
  onScrollStop?: () => void;
  onUpdate?: (values: IScrollFrameProps) => void;
  /**
   * 内容存放的容器
   */
  renderView?: () => React.ReactNode;
  renderTrackHorizontal?: () => React.ReactNode;
  renderTrackVertical?: () => React.ReactNode;
  renderThumbHorizontal?: () => React.ReactNode;
  renderThumbVertical?: () => React.ReactNode;
  /**
   * 是否隐藏Tracks，当内容没有超出容器 (default:false)
   */
  hideTracksWhenNotNeeded?: boolean;
  /**
   * Set a fixed size for thumbs in px
   */
  thumbSize?: number;
  /**
   *  Minimal thumb size in px. (default: 30)
   */
  thumbMinSize?: number;
  /**
   * Enable auto-hide mode， tracks will hide automatically and are only visible while scrolling.
   */
  autoHide?: boolean;
  /**
   *  Hide delay in ms. (default: 1000)
   */
  autoHideTimeout?: number;
  /**
   * Duration for hide animation in ms. (default: 200)
   */
  autoHideDuration?: number;
  /**
   * Enable auto-height mode. (default: false) When true container grows with content
   */
  autoHeight?: boolean;
  /**
   * Set a minimum height for auto-height mode (default: 0)
   */
  autoHeightMin?: number | string;
  /**
   *  Set a maximum height for auto-height mode (default: 200)
   */
  autoHeightMax?: number | string;
  /**
   * Enable universal rendering (default: false)
   */
  universal?: boolean;
  children: React.ReactNode;
}

export default function(props: IScrollBarProps) {
  return <Scrollbars {...props} />;
}
