'use client'

import {useBalance} from '@repo/store/useBalance';
import { Black_And_White_Picture } from 'next/font/google';

export default function () {
    const balance = useBalance();

    return <div>
        hi there {balance}
    </div>
}