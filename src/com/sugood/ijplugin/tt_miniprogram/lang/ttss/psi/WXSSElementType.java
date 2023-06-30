
package com.sugood.ijplugin.tt_miniprogram.lang.ttss.psi;

import com.intellij.psi.tree.IElementType;
import com.sugood.ijplugin.tt_miniprogram.lang.ttss.WXSSLanguage;
import org.jetbrains.annotations.NonNls;
import org.jetbrains.annotations.NotNull;

public class WXSSElementType extends IElementType {
    public WXSSElementType(@NotNull @NonNls String debugName) {
        super(debugName, WXSSLanguage.INSTANCE);
    }

}