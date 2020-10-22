import Vue from 'vue';

const CallNotification = Vue.prototype;

export const OpenNotification_AddItem_OnSuccess = (position, color, duration) => {
    CallNotification.$vs.notification({
        duration,
        color,
        position,
        title: 'ບັນທຶກຂໍ້ມູນ ສຳເລັດເເລ້ວ...',
        text: 'ການບັນທຶກຂໍ້ມູນຂອງທ່ານ ສຳເລັດເເລ້ວ...'
    });
}

export const OpenNotification_EditItem_OnSuccess = (position, color, duration) => {
    CallNotification.$vs.notification({
        duration,
        color,
        position,
        title: 'ເເກ້ໄຂຂໍ້ມູນ ສຳເລັດເເລ້ວ...',
        text: 'ການເເກ້ໄຂຂໍ້ມູນຂອງທ່ານ ສຳເລັດເເລ້ວ...'
    });
}

export const OpenNotification_DeleteItem_OnSuccess = (position, color, duration) => {
    CallNotification.$vs.notification({
        duration,
        color,
        position,
        title: 'ການລຶບຂໍ້ມູນ ສຳເລັດເເລ້ວ...',
        text: 'ການລຶບຂໍ້ມູນຂອງທ່ານ ສຳເລັດເເລ້ວ...'
    });
}

export const OpenNotification_Login_Success = (position, color, duration) => {
    CallNotification.$vs.notification({
        duration,
        color,
        position,
        title: 'ເຂົ້າສູ່ລະບົບ...',
        text: 'ການເຂົ້າສູ່ລະບົບ ສຳເລັດເເລ້ວ...'
    });
}

export const OpenNotification_Logout_Success = (position, color, duration) => {
    CallNotification.$vs.notification({
        duration,
        color,
        position,
        title: 'ອອກຈາກລະບົບ...',
        text: 'ການອອກຈາກລະບົບ ສຳເລັດເເລ້ວ...'
    });
}