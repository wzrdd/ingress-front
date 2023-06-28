import { useState, useEffect } from 'react';
import Link from 'next/link';

import Header from '../../components/Header'


export default function ProductsPage() {
    return (
        <>
            <Header />
            <br/>
            <div class="row justify-content-md-center">
                <div class="col-md-auto">
                    <div class="row">
                        <div class="col-2">
                            <div class="btn btn-primary">
                                <Link class="text-dark" href="#">Hoy</Link>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="btn btn-warning">
                                <Link class="text-dark" href="#">Mañana</Link>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="btn btn-danger">
                                <Link class="text-dark" href="#">7 Días</Link>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="btn btn-success">
                                <Link class="text-dark" href="#">30 días</Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}