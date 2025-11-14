import { useAppSelector, useAppDispatch } from '../store/hooks';
import { 
    fetchPayments, 
    addPayment, 
    updatePayment, 
    deletePayment,
    setFilter,
    setSort,
    applyFiltersAndSortAction
} from '../store/slices/paymentSlice';
import { useEffect } from 'react';
import { useAuth } from './useAuth';

// Custom hook để thay thế usePayment từ PaymentContext
export const usePayment = () => {
    const dispatch = useAppDispatch();
    const payment = useAppSelector((state) => state.payment);
    const { user } = useAuth();

    // Fetch payments khi user thay đổi
    useEffect(() => {
        if (user?.id) {
            dispatch(fetchPayments());
        }
    }, [dispatch, user?.id]);

    // Áp dụng filters và sort khi payments, filters, hoặc sortBy thay đổi
    useEffect(() => {
        if (user?.id && payment.payments.length > 0) {
            const paymentsWithUserId = payment.payments.map(p => {
                if (!p.userId && user?.id) {
                    return { ...p, userId: user.id };
                }
                return p;
            });
            
            dispatch(applyFiltersAndSortAction({
                payments: paymentsWithUserId,
                filters: payment.filters,
                sortBy: payment.sortBy,
                userId: user.id
            }));
        } else if (user?.id && payment.payments.length === 0) {
            dispatch(applyFiltersAndSortAction({
                payments: [],
                filters: payment.filters,
                sortBy: payment.sortBy,
                userId: user.id
            }));
        }
    }, [dispatch, payment.payments, payment.filters, payment.sortBy, user?.id]);

    // Helper functions
    const getUniqueSemesters = () => {
        const semesters = payment.payments
            .filter(p => 
                p.userId === user?.id || 
                p.userId === String(user?.id) || 
                String(p.userId) === String(user?.id)
            )
            .map(p => p.semester);
        return [...new Set(semesters)].sort();
    };

    const getUniqueCourses = () => {
        const courses = payment.payments
            .filter(p => 
                p.userId === user?.id || 
                p.userId === String(user?.id) || 
                String(p.userId) === String(user?.id)
            )
            .map(p => p.courseName);
        return [...new Set(courses)].sort();
    };

    return {
        // State
        payments: payment.filteredPayments,
        allPayments: payment.payments,
        isLoading: payment.isLoading,
        error: payment.error,
        filters: payment.filters,
        sortBy: payment.sortBy,
        totalAmount: payment.totalAmount,

        // Actions
        fetchPayments: () => dispatch(fetchPayments()),
        addPayment: async (paymentData) => {
            const result = await dispatch(addPayment({ payment: paymentData, userId: user?.id }));
            if (addPayment.fulfilled.match(result)) {
                return { success: true, payment: result.payload };
            } else {
                return { success: false, error: result.payload };
            }
        },
        updatePayment: async (id, paymentData) => {
            const existingPayment = payment.payments.find(p => p.id === id || p.id === String(id));
            const result = await dispatch(updatePayment({ 
                id, 
                payment: paymentData, 
                existingPayment, 
                userId: user?.id 
            }));
            if (updatePayment.fulfilled.match(result)) {
                return { success: true, payment: result.payload };
            } else {
                return { success: false, error: result.payload };
            }
        },
        deletePayment: async (id) => {
            const result = await dispatch(deletePayment(id));
            if (deletePayment.fulfilled.match(result)) {
                return { success: true };
            } else {
                return { success: false, error: result.payload };
            }
        },
        setFilter: (field, value) => dispatch(setFilter({ field, value })),
        setSort: (sortBy) => dispatch(setSort(sortBy)),
        getUniqueSemesters,
        getUniqueCourses,
    };
};

