'use client';

import type { Song } from '@/types';

import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';

import MediaItem from './media-item';
import LikeButton from './likeButton';
import Slider from './slider';

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
    const Icon = true ? BsPauseFill : BsPlayFill;
    const VolumeIcon = true ? HiSpeakerXMark : HiSpeakerWave;
    return (
        <div className="grid h-full grid-cols-2 md:grid-cols-3">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>
            <div className="col-auto flex w-full items-center justify-end md:hidden">
                <div
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
                    onClick={() => {}}
                >
                    <Icon size={30} className="text-black" />
                </div>
            </div>
            <div className="hidden h-full w-full max-w-[722px] items-center justify-center gap-x-6 md:flex">
                <AiFillStepBackward
                    size={30}
                    className="cursor-pointer text-neutral-400 transition hover:text-white"
                    onClick={() => {}}
                />
                <div
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
                    onClick={() => {}}
                >
                    <Icon size={30} className="text-black" />
                </div>
                <AiFillStepForward
                    size={30}
                    className="cursor-pointer text-neutral-400 transition hover:text-white"
                    onClick={() => {}}
                />
            </div>
            <div className="hidden w-full justify-end pr-2 md:flex">
                <div className="flex w-[120px] items-center gap-x-2">
                    <VolumeIcon
                        size={34}
                        className="cursor-pointer"
                        onClick={() => {}}
                    />
                    <Slider />
                </div>
            </div>
        </div>
    );
};

export default PlayerContent;
