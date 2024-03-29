'use client';

import { useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import uniqId from 'uniqid';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import useUplaodModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';

import Modal from './modal';
import Input from './input';
import Button from './button';

const UploadModal = () => {
    const [isLodaing, setIsLoading] = useState(false);
    const router = useRouter();
    const uploadModal = useUplaodModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        },
    });

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async values => {
        try {
            setIsLoading(true);
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];
            if (!imageFile || !songFile || !user) {
                toast.error('missing fields');
                return;
            }

            const uniqueID = uniqId();

            // Upload song
            const { data: songData, error: songError } =
                await supabaseClient.storage
                    .from('songs')
                    .upload(`song-${values.title}-${uniqueID}`, songFile, {
                        cacheControl: '3600',
                        upsert: false,
                    });
            if (songError) {
                setIsLoading(false);
                return toast.error('Failed song upload.');
            }

            // Upload image
            const { data: imageData, error: imageError } =
                await supabaseClient.storage
                    .from('images')
                    .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                        cacheControl: '3600',
                        upsert: false,
                    });
            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed image upload.');
            }

            // insert
            const { error: supabaseError } = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path,
                });
            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Song created!');
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input
                    id="title"
                    disabled={isLodaing}
                    {...register('title', { required: true })}
                    placeholder="Song title"
                />
                <Input
                    id="author"
                    disabled={isLodaing}
                    {...register('author', { required: true })}
                    placeholder="Song author"
                />
                <div>
                    <div className="pb-1">Select a song file</div>
                    <Input
                        id="song"
                        type="file"
                        disabled={isLodaing}
                        accept=".mp3"
                        {...register('song', { required: true })}
                    />
                </div>
                <div>
                    <div className="pb-1">Select an image</div>
                    <Input
                        id="image"
                        type="file"
                        disabled={isLodaing}
                        accept="image/*"
                        {...register('image', { required: true })}
                    />
                </div>
                <Button disabled={isLodaing} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    );
};

export default UploadModal;
