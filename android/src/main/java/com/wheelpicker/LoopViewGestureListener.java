package com.wheelpicker;

/**
 * Created by prati on 06-Jul-16 at VARAHI TECHNOLOGIES.
 * http://www.varahitechnologies.com
 */
import android.view.MotionEvent;

final class LoopViewGestureListener extends android.view.GestureDetector.SimpleOnGestureListener {

    final LoopView loopView;

    LoopViewGestureListener(LoopView loopview) {
        super();
        loopView = loopview;
    }

    @Override
    public final boolean onDown(MotionEvent motionevent) {
        loopView.cancelFuture();
        return true;
    }

    @Override
    public final boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
        loopView.smoothScroll(velocityY);
        return true;
    }
}
