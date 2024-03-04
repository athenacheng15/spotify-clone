'use client';

import type { Price, ProductWithPrice } from '@/types';

import { useState } from 'react';

import Modal from './modal';
import Button from './button';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';
import { postData } from '@/libs/helpers';
import { getStripe } from '@/libs/stripeClient';

interface SubscribeModalProps {
    products: ProductWithPrice[];
}

const formatePrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
        maximumFractionDigits: 0,
    }).format((price?.unit_amount || 0) / 100);

    return priceString;
};

const SubscribeModal = ({ products }: SubscribeModalProps) => {
    const { user, isLoading, subscription } = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id);

        if (!user) {
            setPriceIdLoading(undefined);
            return toast.error('Must be logged in');
        }

        if (subscription) {
            setPriceIdLoading(undefined);
            return toast('Already subscribed');
        }

        try {
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price },
            });

            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            toast.error((error as Error)?.message);
        } finally {
            setPriceIdLoading(undefined);
        }
    };

    let content = <div className="text-center">No products available.</div>;
    console.log(products);
    if (products.length) {
        content = (
            <div>
                {products.map(product => {
                    if (!product.prices?.length) {
                        return <div key={product.id}>No prices available</div>;
                    }
                    return product.prices.map(price => (
                        <Button
                            key={price.id}
                            onClick={() => handleCheckout(price)}
                            disabled={isLoading || price.id === priceIdLoading}
                            className="mb-4"
                        >{`Subscribe for ${formatePrice(price)} a ${price.interval}`}</Button>
                    ));
                })}
            </div>
        );
    }

    if (subscription) {
        content = <div>Already subcribed</div>;
    }

    return (
        <Modal
            title="Only for premium users"
            description="Listen to music with Spotify Premium"
            isOpen
            onChange={() => {}}
        >
            {content}
        </Modal>
    );
};

export default SubscribeModal;
