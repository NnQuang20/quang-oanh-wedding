# Lightbox Gallery — Test Checklist

## ✅ Test Steps

### 1. Initial Open
- [ ] Click any gallery item
- [ ] Image appears smoothly (no shrink)
- [ ] Counter shows correct index

### 2. Navigate Forward (Next)
- [ ] Click next button
- [ ] Current image slides LEFT (out of view)
- [ ] New image enters from RIGHT
- [ ] No shrinking during transition
- [ ] Counter updates
- [ ] Can repeat 3+ times

### 3. Navigate Backward (Prev)
- [ ] Click prev button
- [ ] Current image slides RIGHT (out of view)
- [ ] New image enters from LEFT
- [ ] No shrinking during transition
- [ ] Counter updates

### 4. Keyboard Navigation
- [ ] Press → key → next
- [ ] Press ← key → prev
- [ ] Press Esc → close

### 5. Touch/Swipe (Mobile)
- [ ] Swipe left → next
- [ ] Swipe right → prev

### 6. Close & Reopen
- [ ] Close modal (press Esc or click X)
- [ ] Click same gallery item again
- [ ] Opens smoothly (no frozen state)
- [ ] Can navigate in reopened modal

### 7. Rapid Interaction
- [ ] Spam next/prev rapidly (5+ clicks)
- [ ] Should not freeze or duplicate images
- [ ] isAnimating state should stay stable

### 8. Close During Animation
- [ ] Click next
- [ ] Click X or Esc before animation finishes (200ms)
- [ ] Modal closes cleanly
- [ ] Reopen should work normally

### 9. Performance
- [ ] Animation is 60fps smooth (no jank)
- [ ] No layout shift
- [ ] No image flicker

---

## 🔍 Console Checks

Open DevTools Console and verify:
```javascript
// Should see only ONE .current image
document.querySelectorAll('.lightbox-image.current').length === 1

// Should see NO .next images when modal is closed
document.querySelectorAll('.lightbox-image.next').length === 0

// Container should be empty when modal is closed
document.querySelector('.lightbox-container').innerHTML === ''
```

---

## 📊 Key Fixes Applied

1. ✅ Added `scale(1)` to all keyframe transform states
2. ✅ Added `transform-origin: center`
3. ✅ Added `will-change: transform, opacity`
4. ✅ Added `backface-visibility: hidden`
5. ✅ Replaced setTimeout with `animationend` event + safety timeout
6. ✅ Ensure `isAnimating` always resets
7. ✅ Clean container on close
8. ✅ Reset index on modal open
9. ✅ Handle rapid clicks with animation check
